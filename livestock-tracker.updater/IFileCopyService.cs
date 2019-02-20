using System.Threading.Tasks;

namespace LivestockTracker.Updater
{
  public interface IFileCopyService
  {
    void CopyFilesFromToRecursively(string from, string to);
    void DeleteFolderAndFilesRecursively(string folder);
  }
}
