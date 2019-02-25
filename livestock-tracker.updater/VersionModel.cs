using Semver;

namespace LivestockTracker.Updater
{
  public class DownloadableVersionModel
  {
    public DownloadableVersionModel()
    {

    }

    internal DownloadableVersionModel(ApiVersionModel apiVersionModel)
    {
      VersionString = apiVersionModel.Version;
      DownloadPath = apiVersionModel.Link;
      FileName = apiVersionModel.FileName;

      SemVersion.TryParse(apiVersionModel.Version, out SemVersion version);
      Version = version;
    }

    public string VersionString { get; set; }
    public SemVersion Version { get; set; }
    public string DownloadPath { get; set; }
    public string FileName { get; set; }
  }
}
