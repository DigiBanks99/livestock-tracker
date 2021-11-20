using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Updater
{
  public abstract class BaseDownloadService : IDownloadService
  {
    protected readonly ILogger _logger;

    public BaseDownloadService(ILogger logger)
    {
      _logger = logger;
    }

    public abstract Task<DirectoryInfo> DownloadAsync(DownloadableVersionModel version, string savePath, IProgress<int> progress, CancellationToken cancellationToken);
    public abstract Task<long> GetContentLength(string downloadPath);
    public abstract Task<IEnumerable<DownloadableVersionModel>> GetAllAvailableVersions();

    public virtual void CleanUpDownload(string savePath)
    {
      _logger.LogDebug("{0}: Cleaning up download data at {1}", nameof(BaseDownloadService), savePath);

      bool retry = true;
      int maxRetry = 10;
      int retryCount = 0;
      do
      {
        try
        {
          File.Delete(savePath);
          retry = false;
        }
        catch (IOException ex)
        {
          _logger.LogError(ex, "Failed to delete {0} and extracted files. Retry attempt: {1}", savePath, retryCount++);
          if (retryCount == maxRetry)
            throw new IOException($"Could not cleanup files after cancelling. Please remove these files manually before trying again:{Environment.NewLine}\t{savePath}");
        }
      }
      while (retry);
    }

    public virtual async Task<DownloadableVersionModel> GetLatestVersionModel()
    {
      _logger.LogDebug("{0}: Getting latest version model", nameof(BaseDownloadService));

      var versions = await GetAllAvailableVersions();
      DownloadableVersionModel latestVersion = null;
      foreach (var version in versions)
      {
        if (latestVersion == null || version.Version.CompareTo(latestVersion.Version) > 0)
          latestVersion = version;
      }

      return latestVersion;
    }
  }
}
