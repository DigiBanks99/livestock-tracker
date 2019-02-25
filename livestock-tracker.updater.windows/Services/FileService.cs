using Microsoft.Extensions.Logging;
using System.Drawing;
using System.Windows.Forms;

namespace LivestockTracker.Updater.Windows.Services
{
  public class FileService : IFileService
  {
    private readonly ILogger _logger;

    private const string FILE_IMAGE_FILE16_KEY = "file_16";
    private const string FILE_IMAGE_FOLDERCLOSED16_KEY = "folder_closed_16";
    private const string FILE_IMAGE_CSS16_KEY = "css_16";

    public FileService(ILogger logger)
    {
      _logger = logger;
    }

    public string GetFileTypeImageIndex(string fileExtension)
    {
      _logger.LogDebug("{0}: Getting file type image index for extension {1}", nameof(FileService), fileExtension);
      string ext = string.IsNullOrEmpty(fileExtension) ? string.Empty : fileExtension.ToLowerInvariant().Trim().Replace(".", "");
      switch (ext)
      {
        case "": return FILE_IMAGE_FOLDERCLOSED16_KEY;
        case "css": return FILE_IMAGE_CSS16_KEY;
        default:
          return FILE_IMAGE_FILE16_KEY;
      }
    }

    public ImageList GetFileImageList()
    {
      _logger.LogDebug("{0}: Getting file image list", nameof(FileService));
      ImageList imageListFiles = new ImageList();

      imageListFiles.TransparentColor = Color.Transparent;
      imageListFiles.Images.Add(FILE_IMAGE_FILE16_KEY, Properties.Resources.file_16);
      imageListFiles.Images.Add(1.ToString(), Properties.Resources.file_24);
      imageListFiles.Images.Add(2.ToString(), Properties.Resources.file_32);
      imageListFiles.Images.Add(3.ToString(), Properties.Resources.file_64);
      imageListFiles.Images.Add(4.ToString(), Properties.Resources.file_128);
      imageListFiles.Images.Add(5.ToString(), Properties.Resources.file_256);
      imageListFiles.Images.Add(6.ToString(), Properties.Resources.file_512);
      imageListFiles.Images.Add(FILE_IMAGE_FOLDERCLOSED16_KEY, Properties.Resources.folder_closed_16);
      imageListFiles.Images.Add(8.ToString(), Properties.Resources.folder_closed_24);
      imageListFiles.Images.Add(9.ToString(), Properties.Resources.folder_closed_32);
      imageListFiles.Images.Add(10.ToString(), Properties.Resources.folder_closed_64);
      imageListFiles.Images.Add(11.ToString(), Properties.Resources.folder_closed_128);
      imageListFiles.Images.Add(12.ToString(), Properties.Resources.folder_closed_256);
      imageListFiles.Images.Add(13.ToString(), Properties.Resources.folder_closed_512);
      imageListFiles.Images.Add(14.ToString(), Properties.Resources.folder_open_16);
      imageListFiles.Images.Add(15.ToString(), Properties.Resources.folder_open_24);
      imageListFiles.Images.Add(16.ToString(), Properties.Resources.folder_open_32);
      imageListFiles.Images.Add(17.ToString(), Properties.Resources.folder_open_64);
      imageListFiles.Images.Add(18.ToString(), Properties.Resources.folder_open_128);
      imageListFiles.Images.Add(19.ToString(), Properties.Resources.folder_open_256);
      imageListFiles.Images.Add(20.ToString(), Properties.Resources.folder_open_512);
      imageListFiles.Images.Add(FILE_IMAGE_CSS16_KEY, Properties.Resources.file_css_16);
      imageListFiles.Images.Add(22.ToString(), Properties.Resources.file_css_24);
      imageListFiles.Images.Add(23.ToString(), Properties.Resources.file_css_32);
      imageListFiles.Images.Add(24.ToString(), Properties.Resources.file_css_64);
      imageListFiles.Images.Add(25.ToString(), Properties.Resources.file_css_128);
      imageListFiles.Images.Add(26.ToString(), Properties.Resources.file_css_256);
      imageListFiles.Images.Add(27.ToString(), Properties.Resources.file_css_512);

      return imageListFiles;
    }
  }
}
