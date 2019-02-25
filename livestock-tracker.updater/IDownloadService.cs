using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Updater
{
  public interface IDownloadService
  {
    Task<DirectoryInfo> DownloadAsync(DownloadableVersionModel version, string savePath, IProgress<int> progress, CancellationToken cancellationToken);
    void CleanUpDownload(string savePath);
    Task<long> GetContentLength(string downloadPath);
    Task<IEnumerable<DownloadableVersionModel>> GetAllAvailableVersions();
    Task<DownloadableVersionModel> GetLatestVersionModel();
  }
}
