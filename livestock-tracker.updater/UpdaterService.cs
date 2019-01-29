using LivestockTracker.Base;
using LivestockTracker.Base.Extensions.System.IO;
using LivestockTracker.ProcessManager;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace LivestockTracker.Updater
{
  public class UpdaterService : IUpdaterService
  {
    private DirectoryInfo _installPath;

    public UpdaterService() { }

    public UpdaterModel DetermineInitialUpdateInformation()
    {
      _installPath = FindInstallPath();
      var oldFiles = GetFiles();
      FileInfo startUpDllFileInfo = _installPath.GetFiles("livestock-tracker.dll").FirstOrDefault();
      DotnetCoreAppVersionChecker versionChecker = new DotnetCoreAppVersionChecker(startUpDllFileInfo);

      return new UpdaterModel
      {
        InstallPath = _installPath.FullName,
        OldVersion = versionChecker.GetVersion(),
        NewVersion = System.Diagnostics.FileVersionInfo.GetVersionInfo(this.GetType().Assembly.CodeBase.Replace("file:///", "")).FileVersion,
        OldFiles = oldFiles
      };
    }

    public DirectoryInfo FindInstallPath()
    {
      string root = Path.GetPathRoot(Environment.SystemDirectory);
      string solutionFolder = "livestock-tracker";
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
      return _installPath.GetFiles().Select(x => new TreeItem<string>(x.Name, x.DirectoryName));
    }
  }
}
