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
      FileVersionInfo versionInfo = FileVersionInfo.GetVersionInfo(_dotnetDllFileInfo.FullName);
      return versionInfo.FileVersion;
    }
  }
}
