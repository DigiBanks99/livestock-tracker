using System.Diagnostics;
using System.IO;

namespace LivestockTracker.ProcessManager
{
  public class DotnetCoreAppVersionChecker : IVersionChecker
  {
    private readonly FileInfo _dotnetDllFileInfo;

    public DotnetCoreAppVersionChecker(FileInfo dotnetDllFileInfo)
    {
      _dotnetDllFileInfo = dotnetDllFileInfo;
    }

    public string GetVersion()
    {
      if (_dotnetDllFileInfo == null)
        throw new FileNotFoundException();

      if (!File.Exists(_dotnetDllFileInfo.FullName))
      {
        var exc = new FileNotFoundException();
        exc.Data.Add(nameof(_dotnetDllFileInfo), _dotnetDllFileInfo);
      }

      FileVersionInfo versionInfo = FileVersionInfo.GetVersionInfo(_dotnetDllFileInfo.FullName);
      return versionInfo.FileVersion;
    }
  }
}
