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
      bool parsed = SemVersion.TryParse(version, SemVersionStyles.Any, out SemVersion? semVersion);
      if (parsed)
      {
        return semVersion!;
      }

      string[] parts = version.Split('.');
      if (parts == null || parts.Length == 0)
      {
        throw new VersionNotSupportedException(version);
      }

      bool majorParsed = int.TryParse(parts[0], out int major);

      if (!majorParsed)
      {
        throw new VersionNotSupportedException(version);
      }

      int minor = 0;
      if (parts.Length > 1)
        int.TryParse(parts[1], out minor);

      int patch = 0;
      if (parts.Length > 2)
        int.TryParse(parts[2], out patch);

      string prerelease = parts.Length > 3 ? parts[3] : "";
      string metadata = parts.Length > 4 ? parts[4] : "";

      // Build version string and parse with lenient styles
      string rebuilt = $"{major}.{minor}.{patch}";
      if (!string.IsNullOrEmpty(prerelease))
        rebuilt += $"-{prerelease}";
      if (!string.IsNullOrEmpty(metadata))
        rebuilt += $"+{metadata}";

      return SemVersion.Parse(rebuilt, SemVersionStyles.Any);
    }
  }
}
