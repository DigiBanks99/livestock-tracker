using LivestockTracker.Base.Extensions.System.IO;
using System;
using System.IO;
using System.Linq;

namespace LivestockTracker.Updater
{
  public class UpdaterService : IUpdaterService
  {
    private DirectoryInfo _installPath;

    public UpdaterModel DetermineInitialUpdateInformation()
    {
      _installPath = FindInstallPath();

      return new UpdaterModel
      {
        InstallPath = _installPath.FullName,
        OldVersion = "1.0.0",
        NewVersion = this.GetType().Assembly.ImageRuntimeVersion
      };
    }

    public DirectoryInfo FindInstallPath()
    {
      var root = Path.GetPathRoot(Environment.SystemDirectory);
      var solutionFolder = "livestock-tracker";
      var entryPoints = new string[]
      {
        Path.Combine(root, "Programs"),
        Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles).Replace(" (x86)", ""),
        Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86)
      };

      DirectoryInfo installPath = new DirectoryInfo(entryPoints.First()).Null();
      int index = 0;
      do
      {
        var currentEntryPoint = entryPoints[index++];
        var path = new DirectoryInfo(currentEntryPoint);
        var searchResult = DoSearch(path, solutionFolder);
        if (!searchResult.IsNull())
          installPath = searchResult;
      }
      while (installPath == null && index < entryPoints.Length);

      return installPath;
    }

    public DirectoryInfo DoSearch(DirectoryInfo path, string term)
    {
      var validPaths = path.GetDirectories(term);
      if (validPaths != null && validPaths.Any())
        return validPaths.First();

      foreach (var subPath in path.GetDirectories())
      {
        var searchResult = DoSearch(subPath, term);
        if (searchResult != null) return searchResult;
      }

      return path.Null();
    }
  }
}
