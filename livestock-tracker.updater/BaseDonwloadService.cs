using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Updater
{
  public abstract class BaseDonwloadService : IDownloadService
  {
    protected readonly ILogger _logger;

    public BaseDonwloadService(ILogger logger)
    {
      _logger = logger;
    }

    public abstract Task<DirectoryInfo> DownloadAsync(string fileName, string savePath, IProgress<int> progress, CancellationToken cancellationToken);
    public abstract long GetContentLength(string downloadPath);
    public abstract IEnumerable<string> GetAllAvailableVersions();

    public virtual void CleanUpDownload(string savePath)
    {
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

    public virtual VersionModel GetLatestVersionModel()
    {
      var model = new VersionModel();
      var files = GetAllAvailableVersions();
      Semver.SemVersion latestSemanticVersion = null;
      foreach (var file in files)
      {
        var versionString = file.ToLowerInvariant().Replace(".zip", "");
        versionString = versionString.Substring(versionString.LastIndexOf('_') + 1);
        if (!Semver.SemVersion.TryParse(versionString, out Semver.SemVersion semanticVersion))
          continue;

        model.Version = semanticVersion;
        model.VersionString = versionString;
        if (latestSemanticVersion == null)
        {
          latestSemanticVersion = semanticVersion;
          model.DownloadPath = file;
        }
        else if (semanticVersion.CompareTo(latestSemanticVersion) > 0)
        {
          latestSemanticVersion = semanticVersion;
          model.DownloadPath = file;
        }
      }

      return model;
    }
  }
}
