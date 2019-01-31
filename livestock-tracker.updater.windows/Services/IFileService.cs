using System.Windows.Forms;

namespace LivestockTracker.Updater.Windows.Services
{
  public interface IFileService
  {
    string GetFileTypeImageIndex(string fileExtension);
    ImageList GetFileImageList();
  }
}
