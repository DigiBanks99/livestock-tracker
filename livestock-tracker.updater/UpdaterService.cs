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
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Updater
{
  public class UpdaterService : IUpdaterService
  {
    private readonly ILogger _logger;
    private readonly IFileCopyService _fileCopyService;
    private readonly IDownloadService _downloadService;

    public UpdaterService(ILogger logger, IFileCopyService fileCopyService, IDownloadService downloadService)
    {
      _logger = logger;
      _fileCopyService = fileCopyService;
      _downloadService = downloadService;
    }

    public async Task<UpdaterModel> DetermineInitialUpdateInformation(string installPath = null)
    {
      _logger.LogDebug("{0}: Determining Initial Update Information: {1}", nameof(UpdaterService), installPath);
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
          NewVersionString = FileVersionInfo.GetVersionInfo(this.GetType().Assembly.CodeBase.Replace(Constants.FILE_URI_PREFIX, "")).FileVersion
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

      var newVersionInfo = await _downloadService.GetLatestVersionModel();
      return new UpdaterModel
      {
        InstallPath = installDir.FullName,
        OldVersion = version,
        NewVersionString = newVersionInfo.VersionString,
        NewVersionModel = newVersionInfo,
        OldFiles = oldFiles
      };
    }

    public DirectoryInfo FindInstallPath()
    {
      _logger.LogDebug("{0}: Finding installation path", nameof(UpdaterService));
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
      _logger.LogDebug("{0}: Searching directory {1} for files in the pattern {2}", nameof(UpdaterService), path, term);
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
      _logger.LogDebug("{0}: Obtaining directory files for {1}", nameof(UpdaterService), path);
      var files = new List<TreeItem<string>>
      {
        new TreeItem<string>(path.FullName, null)
      };
      AddChildDirectoryAndFiles(files, path);
      return files;
    }

    public UpdaterModel GetNewFiles(FileInfo archivePath, UpdaterModel currentData)
    {
      _logger.LogDebug("{0}: Getting the new files for {1} with current data: {2}", nameof(UpdaterService), archivePath, currentData);
      var unpackedPath = archivePath.FullName.Replace(".zip", "");
      var unpackedDirectory = new DirectoryInfo(unpackedPath);
      if (!unpackedDirectory.Exists)
      {
        unpackedDirectory.Create();
        ZipFile.ExtractToDirectory(archivePath.FullName, unpackedDirectory.FullName);
        Thread.Sleep(10);
      }

      var newFiles = GetFiles(unpackedDirectory);
      return new UpdaterModel
      {
        InstallPath = currentData.InstallPath,
        NewFiles = newFiles,
        NewVersionString = currentData.NewVersionString,
        NewVersionModel = currentData.NewVersionModel,
        OldFiles = currentData.OldFiles,
        OldVersion = currentData.OldVersion
      };
    }

    public void Update(UpdaterModel updaterModel, IProgress<int> progress, CancellationToken cancellationToken)
    {
      _logger.LogDebug("{0}: Executing update with data {1}", nameof(UpdaterService), updaterModel);
      var newVersionPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), Constants.SOLUTION_ENTRYPOINT_NAME, Constants.SOLUTION_DOWNLOADS_NAME, updaterModel.NewVersionModel.VersionString);
      var tempPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), Constants.SOLUTION_ENTRYPOINT_NAME, Constants.SOLUTION_TEMP_NAME, updaterModel.OldVersion);

      _fileCopyService.CopyFilesFromToRecursively(updaterModel.InstallPath, tempPath);

      progress.Report(100);
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
  }
}
