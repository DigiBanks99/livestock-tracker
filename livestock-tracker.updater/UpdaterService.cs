using LivestockTracker.Base;
using LivestockTracker.ProcessManager;
using LivestockTracker.Updater.Config;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;

namespace LivestockTracker.Updater
{
  public class UpdaterService : IUpdaterService
  {
    private readonly ILogger _logger;
    private readonly IFtpConfig _ftpConfig;

    public UpdaterService(ILogger logger, IFtpConfig ftpConfig)
    {
      _logger = logger;
      _ftpConfig = ftpConfig;

      _logger.LogDebug("UpdateService: FTP - Server: {0}, Username: {1}, Password: {2}", _ftpConfig.Server, _ftpConfig.Username, _ftpConfig.Password);
    }

    public UpdaterModel DetermineInitialUpdateInformation(string installPath = null)
    {
      _logger.LogDebug("Determining Initial Update Information: {installPath}", installPath);
      var installDir = string.IsNullOrEmpty(installPath) ? FindInstallPath() : new DirectoryInfo(installPath);
      var oldFiles = GetFiles(installDir);

      FileInfo startUpDllFileInfo = null;
      try
      {
        startUpDllFileInfo = installDir.GetFiles(Constants.SOLUTION_ENTRYPOINT_DLL_NAME).FirstOrDefault();
      }
      catch (DirectoryNotFoundException)
      {
        return new UpdaterModel
        {
          NewVersion = FileVersionInfo.GetVersionInfo(this.GetType().Assembly.CodeBase.Replace(Constants.FILE_URI_PREFIX, "")).FileVersion
        };
      }

      DotnetCoreAppVersionChecker versionChecker = new DotnetCoreAppVersionChecker(startUpDllFileInfo);
      string version = null;
      try
      {
        version = versionChecker.GetVersion();
      }
      catch (FileNotFoundException ex)
      {
        version = ex.Data.Keys.Count == 0 ? Constants.VERSION_NOT_INSTALLED_TEXT : Constants.VERSION_EMPTY;
      }

      var newVersionInfo = GetNewVersion();
      return new UpdaterModel
      {
        InstallPath = installDir.FullName,
        OldVersion = version,
        NewVersion = newVersionInfo.NewVersion,
        NewVersionName = newVersionInfo.NewVersionName,
        OldFiles = oldFiles
      };
    }

    public DirectoryInfo FindInstallPath()
    {
      _logger.LogDebug("Finding installation path");
      string root = Path.GetPathRoot(Environment.SystemDirectory);
      string solutionFolder = Constants.SOLUTION_ENTRYPOINT_NAME;
      string[] entryPoints = new string[]
      {
        Path.Combine(root, "Programs"),
        Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles).Replace(" (x86)", ""),
        Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86)
      };

      DirectoryInfo installPath = new DirectoryInfo(entryPoints.First()).Null();
      int index = 0;
      do
      {
        string currentEntryPoint = entryPoints[index++];
        DirectoryInfo path = new DirectoryInfo(currentEntryPoint);
        DirectoryInfo searchResult = DoSearch(path, solutionFolder);
        if (!searchResult.IsNull())
          installPath = searchResult;
      }
      while (installPath == null && index < entryPoints.Length);

      return installPath;
    }

    public DirectoryInfo DoSearch(DirectoryInfo path, string term)
    {
      _logger.LogDebug("Searching directory {0} for files in the pattern {1}", path, term);
      DirectoryInfo[] validPaths = path.GetDirectories(term);
      if (validPaths != null && validPaths.Any())
        return validPaths.First();

      foreach (DirectoryInfo subPath in path.GetDirectories())
      {
        DirectoryInfo searchResult = DoSearch(subPath, term);
        if (searchResult != null) return searchResult;
      }

      return path.Null();
    }

    public IEnumerable<TreeItem<string>> GetFiles(DirectoryInfo path)
    {
      _logger.LogDebug("Obtaining directory files for {0}", path);
      var files = new List<TreeItem<string>>
      {
        new TreeItem<string>(path.FullName, null)
      };
      AddChildDirectoryAndFiles(files, path);
      return files;
    }

    public DirectoryInfo Download(string fileName, string savePath)
    {
      _logger.LogDebug("Downloading {0} to {1}", fileName, savePath);

      int bytesRead = 0;
      byte[] buffer = new byte[1024];
      string downloadPath = $"{_ftpConfig.Server}{fileName}";

      var request = (FtpWebRequest)WebRequest.Create(downloadPath);
      request.Method = WebRequestMethods.Ftp.DownloadFile;
      request.UsePassive = true;
      request.UseBinary = true;
      request.KeepAlive = true;

      request.Credentials = new NetworkCredential(_ftpConfig.Username, _ftpConfig.Password);

      var response = (FtpWebResponse)request.GetResponse();
      Stream responseStream = response.GetResponseStream();
      try
      {
        using (FileStream fs = new FileStream(savePath, FileMode.CreateNew))
        {
          while (true)
          {
            bytesRead = responseStream.Read(buffer, 0, buffer.Length);

            if (bytesRead == 0)
              break;

            fs.Write(buffer, 0, bytesRead);
          }
        }
      }
      catch (IOException ex)
      {
        _logger.LogError(ex, $"Downloading {downloadPath} failed.");
      }

      return new DirectoryInfo(savePath);
    }

    public UpdaterModel GetNewFiles(FileInfo archivePath, UpdaterModel currentData)
    {
      var unpackedPath = archivePath.FullName.Replace(".zip", "");
      var unpackedDirectory = new DirectoryInfo(unpackedPath);
      if (!unpackedDirectory.Exists)
      {
        unpackedDirectory.Create();
        ZipFile.ExtractToDirectory(archivePath.FullName, unpackedPath);
      }

      var newFiles = GetFiles(unpackedDirectory);
      return new UpdaterModel
      {
        InstallPath = currentData.InstallPath,
        NewFiles = newFiles,
        NewVersion = currentData.NewVersion,
        NewVersionName = currentData.NewVersionName,
        OldFiles = currentData.OldFiles,
        OldVersion = currentData.OldVersion
      };
    }

    private void AddChildDirectoryAndFiles(IEnumerable<TreeItem<string>> files, DirectoryInfo directory)
    {
      var listRef = files as IList<TreeItem<string>>;
      if (!directory.Exists || listRef == null)
        return;

      var dirs = directory.GetDirectories();
      if (dirs.Any())
      {
        foreach (var dir in dirs)
        {
          listRef.Add(new TreeItem<string>(dir.FullName, directory.FullName));
          AddChildDirectoryAndFiles(files, dir);
        }
      }

      var dirFiles = directory.GetFiles().OrderBy(f => f.Name);
      if (dirFiles.Any())
      {
        foreach (var file in dirFiles)
          listRef.Add(new TreeItem<string>(file.FullName, directory.FullName));
      }
    }

    private UpdaterModel GetNewVersion()
    {
      var updaterModel = new UpdaterModel();
      var files = GetAllAvailableVersions();
      var comparer = new SemVersion.VersionComparer();
      SemVersion.SemanticVersion latestSemanticVersion = null;
      foreach (var file in files)
      {
        var versionString = file.ToLowerInvariant().Replace(".zip", "");
        versionString = versionString.Substring(versionString.LastIndexOf('_') + 1);
        if (!SemVersion.SemanticVersion.TryParse(versionString, out SemVersion.SemanticVersion semanticVersion))
          continue;

        if (latestSemanticVersion == null)
        {
          latestSemanticVersion = semanticVersion;
          updaterModel.NewVersionName = file;
        }
        else if (comparer.Compare(latestSemanticVersion, semanticVersion) > 0)
        {
          latestSemanticVersion = semanticVersion;
          updaterModel.NewVersionName = file;
        }
      }

      updaterModel.NewVersion = latestSemanticVersion != null ? latestSemanticVersion.ToString() : string.Empty;
      return updaterModel;
    }

    private IEnumerable<string> GetAllAvailableVersions()
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
