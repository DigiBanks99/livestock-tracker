using LivestockTracker.Base;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LivestockTracker.Updater
{
  public class UpdaterModel
  {
    public UpdaterModel()
    {
      OldFiles = Enumerable.Empty<TreeItem<string>>();
      NewFiles = Enumerable.Empty<TreeItem<string>>();
    }

    public string InstallPath { get; set; }
    public string OldVersion { get; set; }
    public string NewVersion { get; set; }
    public string NewVersionName { get; set; }
    public IEnumerable<TreeItem<string>> OldFiles { get; set; }
    public IEnumerable<TreeItem<string>> NewFiles { get; set; }
  }
}
