using LivestockTracker.Updater.Config;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
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

    public async override Task<DirectoryInfo> DownloadAsync(string fileName, string savePath, IProgress<int> progress, CancellationToken cancellationToken)
    {
      _logger.LogDebug("Downloading {0} to {1} [{progress}]", fileName, savePath, progress);

      int bytesRead = 0;
      byte[] buffer = new byte[1024];
      string downloadPath = $"{_ftpConfig.Server}{fileName}";

      var contentLength = GetContentLength(downloadPath);
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

    public override long GetContentLength(string downloadPath)
    {
      var sizeRequest = (FtpWebRequest)WebRequest.Create(downloadPath);
      sizeRequest.Method = WebRequestMethods.Ftp.GetFileSize;
      sizeRequest.Credentials = new NetworkCredential(_ftpConfig.Username, _ftpConfig.Password);
      return sizeRequest.GetResponse().ContentLength;
    }

    public override IEnumerable<string> GetAllAvailableVersions()
    {
      var request = (FtpWebRequest)WebRequest.Create(_ftpConfig.Server);
      request.Method = WebRequestMethods.Ftp.ListDirectory;

      request.Credentials = new NetworkCredential(_ftpConfig.Username, _ftpConfig.Password);

      var response = (FtpWebResponse)request.GetResponse();
      Stream responseStream = response.GetResponseStream();
      StreamReader reader = new StreamReader(responseStream);
      var lines = reader.ReadToEnd();
      return lines.Split(new string[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries);
    }
  }
}
