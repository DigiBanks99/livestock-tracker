using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Updater
{
  public interface IDownloadService
  {
    Task<DirectoryInfo> DownloadAsync(string fileName, string savePath, IProgress<int> progress, CancellationToken cancellationToken);
    void CleanUpDownload(string savePath);
    long GetContentLength(string downloadPath);
    IEnumerable<string> GetAllAvailableVersions();
    VersionModel GetLatestVersionModel();
  }
}
