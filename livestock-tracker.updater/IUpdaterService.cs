using LivestockTracker.Base;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Updater
{
  public interface IUpdaterService
  {
    UpdaterModel DetermineInitialUpdateInformation(string installPath = null);
    DirectoryInfo FindInstallPath();
    DirectoryInfo DoSearch(DirectoryInfo path, string term);
    IEnumerable<TreeItem<string>> GetFiles(DirectoryInfo path);
    Task<DirectoryInfo> DownloadAsync(string fileName, string savePath, IProgress<int> progress, CancellationToken cancellationToken);
    UpdaterModel GetNewFiles(FileInfo archivePath, UpdaterModel currentData);
  }
}
