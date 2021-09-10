using Microsoft.Extensions.Logging;
using System.IO;

namespace LivestockTracker.Updater
{
  public class FileCopyService : IFileCopyService
  {
    private readonly ILogger _logger;

    public FileCopyService(ILogger<FileCopyService> logger)
    {
      _logger = logger;
    }

    public void CopyFilesFromToRecursively(string from, string to)
    {
      _logger.LogDebug("{0}: Copying directory and contents from {1} to {2}", nameof(FileCopyService), from, to);

      if (!Directory.Exists(to))
      {
        Directory.CreateDirectory(to);
      }

      var dirInfo = new DirectoryInfo(from);
      if (!dirInfo.Exists)
      {
        throw new DirectoryNotFoundException($"The directory cannot be found: {from}");
      }

      var subDirectories = dirInfo.GetDirectories();
      foreach (var subDir in subDirectories)
      {
        var toSubDir = Path.Combine(to, subDir.Name);
        CopyFilesFromToRecursively(subDir.FullName, toSubDir);
      }

      var files = dirInfo.GetFiles();
      foreach (var file in files)
      {
        var toFile = Path.Combine(to, file.Name);
        file.CopyTo(toFile, false);
      }
    }

    public void DeleteFolderAndFilesRecursively(string folder)
    {
      _logger.LogDebug("{0}: Deleting {1} and contents", nameof(FileCopyService), folder);

      var dirInfo = new DirectoryInfo(folder);
      if (!dirInfo.Exists)
      {
        return;
      }

      dirInfo.Delete(true);
    }
  }
}
