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
    Task<UpdaterModel> DetermineInitialUpdateInformation(string installPath = null);
    DirectoryInfo FindInstallPath();
    DirectoryInfo DoSearch(DirectoryInfo path, string term);
    IEnumerable<TreeItem<string>> GetFiles(DirectoryInfo path);
    UpdaterModel GetNewFiles(FileInfo archivePath, UpdaterModel currentData);
    void Update(UpdaterModel updaterModel, IProgress<int> progress, CancellationToken cancellationToken);
  }
}
