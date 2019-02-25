using LivestockTracker.Updater.Config;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Updater
{
  public class FtpDownloadService : BaseDonwloadService, IDownloadService
  {
    private readonly IFtpConfig _ftpConfig;

    public FtpDownloadService(ILogger logger, IFtpConfig ftpConfig) : base(logger)
    {
      _ftpConfig = ftpConfig;

      _logger.LogDebug("FtpDownloadService: FTP - Server: {0}, Username: {1}, Password: {2}", _ftpConfig.Server, _ftpConfig.Username, _ftpConfig.Password);
    }

    public override async Task<DirectoryInfo> DownloadAsync(DownloadableVersionModel version, string savePath, IProgress<int> progress, CancellationToken cancellationToken)
    {
      _logger.LogDebug("{0}: Downloading {1} to {2} [{progress}]", nameof(FtpDownloadService), version.DownloadPath, savePath, progress);

      int bytesRead = 0;
      byte[] buffer = new byte[1024];
      string downloadPath = $"{_ftpConfig.Server}{version.FileName}";

      var contentLength = await GetContentLength(downloadPath);
      if (cancellationToken.IsCancellationRequested)
        return new DirectoryInfo(savePath);

      var progressValue = 0;

      var request = (FtpWebRequest)WebRequest.Create(downloadPath);
      request.Method = WebRequestMethods.Ftp.DownloadFile;
      request.UsePassive = true;
      request.UseBinary = true;
      request.KeepAlive = true;

      request.Credentials = new NetworkCredential(_ftpConfig.Username, _ftpConfig.Password);

      var response = (FtpWebResponse)request.GetResponse();
      try
      {
        Stream responseStream = response.GetResponseStream();
        using (FileStream fs = new FileStream(savePath, FileMode.CreateNew))
        {
          while (!cancellationToken.IsCancellationRequested)
          {
            bytesRead = await responseStream.ReadAsync(buffer, 0, buffer.Length);
            progressValue = (int)(fs.Position / (contentLength * 1m) * 100);
            if (bytesRead == 0)
            {
              progress.Report(100);
              break;
            }

            await fs.WriteAsync(buffer, 0, bytesRead);
            progress.Report(progressValue);
          }
        }

        responseStream.Close();

        if (cancellationToken.IsCancellationRequested)
          CleanUpDownload(savePath);
      }
      catch (IOException ex)
      {
        _logger.LogError(ex, $"Downloading {downloadPath} failed.");
      }

      return new DirectoryInfo(savePath);
    }

    public override async Task<long> GetContentLength(string downloadPath)
    {
      var response = await Task.Run(() =>
      {
        var sizeRequest = (FtpWebRequest)WebRequest.Create(downloadPath);
        sizeRequest.Method = WebRequestMethods.Ftp.GetFileSize;
        sizeRequest.Credentials = new NetworkCredential(_ftpConfig.Username, _ftpConfig.Password);
        return sizeRequest.GetResponse();
      });
      return response.ContentLength;
    }

    public override async Task<IEnumerable<DownloadableVersionModel>> GetAllAvailableVersions()
    {
      var request = (FtpWebRequest)WebRequest.Create(_ftpConfig.Server);
      request.Method = WebRequestMethods.Ftp.ListDirectory;

      request.Credentials = new NetworkCredential(_ftpConfig.Username, _ftpConfig.Password);

      var response = (FtpWebResponse)request.GetResponse();
      Stream responseStream = response.GetResponseStream();
      StreamReader reader = new StreamReader(responseStream);
      var lines = reader.ReadToEnd();
      var versionLines = await Task.Run(() => (IEnumerable<string>)lines.Split(new string[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries));
      return versionLines.Select(vl =>
      {
        Semver.SemVersion.TryParse(vl, out Semver.SemVersion version);
        var fileName = vl;
        return new DownloadableVersionModel
        {
          Version = version,
          VersionString = vl.ToLowerInvariant().Replace(".zip", "").Replace("win", ""),
          FileName = vl,
          DownloadPath = Path.Combine(_ftpConfig.Server, vl)
        };
      });
    }
  }
}
