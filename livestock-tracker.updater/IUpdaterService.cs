using LivestockTracker.Base;
using System.Collections.Generic;
using System.IO;

namespace LivestockTracker.Updater
{
  public interface IUpdaterService
  {
    UpdaterModel DetermineInitialUpdateInformation(string installPath = null);
    DirectoryInfo FindInstallPath();
    DirectoryInfo DoSearch(DirectoryInfo path, string term);
    IEnumerable<TreeItem<string>> GetFiles(DirectoryInfo path);
    DirectoryInfo Download(string fileName, string savePath);
    UpdaterModel GetNewFiles(FileInfo archivePath, UpdaterModel currentData);
  }
}
