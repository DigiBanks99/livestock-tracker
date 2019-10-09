using LivestockTracker.Updater.Exceptions;
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

      Version = Parse(apiVersionModel.Version);
    }

    public string VersionString { get; set; }
    public SemVersion Version { get; set; }
    public string DownloadPath { get; set; }
    public string FileName { get; set; }

    private SemVersion Parse(string version)
    {
      bool parsed = SemVersion.TryParse(version, out SemVersion semVersion);
      if (parsed)
      {
        return semVersion;
      }
      else
      {
        string[] parts = version.Split('.');
        if (parts == null || parts.Length == 0)
        {
          throw new VersionNotSupportedException(version);
        }

        bool majorParsed = int.TryParse(parts[0], out int major);

        if (majorParsed)
        {
          semVersion = new SemVersion(major);
          int minor = 0;
          bool minorParsed = parts.Length > 1 && int.TryParse(parts[1], out minor);
          if (minorParsed)
          {
            semVersion = new SemVersion(major, minor);
            int patch = 0;
            bool patchParsed = parts.Length > 2 && int.TryParse(parts[2], out patch);
            if (patchParsed)
            {
              semVersion = new SemVersion(major, minor, patch);

              if (parts.Length > 4)
              {
                semVersion = new SemVersion(major, minor, patch, parts[3], parts[4]);
              }
              else if (parts.Length > 3)
              {
                semVersion = new SemVersion(major, minor, patch, parts[3]);
              }
            }
          }
        }
        else
        {
          throw new VersionNotSupportedException(version);
        }
        return semVersion;
      }
    }
  }
}
