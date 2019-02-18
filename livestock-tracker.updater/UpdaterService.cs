using LivestockTracker.Base;
using LivestockTracker.Base.Extensions.System.IO;
using LivestockTracker.ProcessManager;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;

namespace LivestockTracker.Updater
{
  public class UpdaterService : IUpdaterService
  {
    private readonly ILogger _logger;
    private DirectoryInfo _installPath;

    public UpdaterService(ILogger logger)
    {
      _logger = logger;
    }

    public UpdaterModel DetermineInitialUpdateInformation(string installPath = null)
    {
      _logger.LogDebug("Determining Initial Update Information: {installPath}", installPath);
      _installPath = string.IsNullOrEmpty(installPath) ? FindInstallPath() : new DirectoryInfo(installPath);
      var oldFiles = GetFiles();
      FileInfo startUpDllFileInfo = null;
      try
      {
        startUpDllFileInfo = _installPath.GetFiles(Constants.SOLUTION_ENTRYPOINT_DLL_NAME).FirstOrDefault();
      }
      catch (DirectoryNotFoundException)
      {
        return new UpdaterModel
        {
          NewVersion = FileVersionInfo.GetVersionInfo(this.GetType().Assembly.CodeBase.Replace(Constants.FILE_URI_PREFIX, "")).FileVersion
        };
      }
      DotnetCoreAppVersionChecker versionChecker = new DotnetCoreAppVersionChecker(startUpDllFileInfo);

      return new UpdaterModel
      {
        InstallPath = _installPath.FullName,
        OldVersion = versionChecker.GetVersion(),
        NewVersion = FileVersionInfo.GetVersionInfo(this.GetType().Assembly.CodeBase.Replace(Constants.FILE_URI_PREFIX, "")).FileVersion,
        OldFiles = oldFiles
      };
    }

    public DirectoryInfo FindInstallPath()
    {
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

    public IEnumerable<TreeItem<string>> GetFiles()
    {
      var oldFiles = new List<TreeItem<string>>
      {
        new TreeItem<string>(_installPath.FullName, null)
      };
      AddChildDirectoryAndFiles(oldFiles, _installPath);
      return oldFiles;
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
