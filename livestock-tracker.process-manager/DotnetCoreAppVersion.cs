using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace LivestockTracker.ProcessManager
{
  public class DotnetCoreAppVersionChecker
  {
    private string VERSION_TEXT = "version";
    private readonly FileInfo _dotnetDllFileInfo;
    public DotnetCoreAppVersionChecker(FileInfo dotnetDllFileInfo)
    {
      _dotnetDllFileInfo = dotnetDllFileInfo;
    }

    public string GetVersion()
    {
      var assembly = LoadAssembly();
      try
      {
        return assembly.GetCustomAttribute<AssemblyFileVersionAttribute>().Version;
      }
      catch (Exception)
      {
        var sections = assembly.FullName.Split(' ');
        var versionSection = sections.FirstOrDefault(s => s.ToLowerInvariant().Contains(VERSION_TEXT));
        if (!string.IsNullOrEmpty(versionSection))
        {
          var versionText = VERSION_TEXT + "=";
          var versionTextIndex = versionSection.ToLowerInvariant().IndexOf(versionText);
          var version = versionSection.Remove(versionTextIndex, versionText.Length).Replace(",", "");
          return version;
        }
        return versionSection;
      }
    }

    private Assembly LoadAssembly()
    {
      var assembly = Assembly.LoadFrom(_dotnetDllFileInfo.FullName);
      return assembly;
    }
  }
}
