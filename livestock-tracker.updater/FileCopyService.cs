using System.IO;

namespace LivestockTracker.Updater
{
  public class FileCopyService : IFileCopyService
  {
    public void CopyFilesFromToRecursively(string from, string to)
    {
      if (!Directory.Exists(to))
        Directory.CreateDirectory(to);

      var dirInfo = new DirectoryInfo(from);
      if (!dirInfo.Exists)
        throw new DirectoryNotFoundException($"The directory cannot be found: {from}");

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
      var dirInfo = new DirectoryInfo(folder);
      if (!dirInfo.Exists)
        return;

      dirInfo.Delete(true);
    }
  }
}
