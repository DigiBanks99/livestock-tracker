using System;
using System.Collections.Generic;
using System.Text;

namespace LivestockTracker.Updater
{
  public class VersionModel
  {
    public string VersionString { get; set; }
    public Semver.SemVersion Version { get; set; }
    public string DownloadPath { get; set; }
  }
}
