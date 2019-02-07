using LivestockTracker.Base;
using System.Collections.Generic;

namespace LivestockTracker.Updater
{
  public class UpdaterModel
  {
    public string InstallPath { get; set; }
    public string OldVersion { get; set; }
    public string NewVersion { get; set; }
    public IEnumerable<TreeItem<string>> OldFiles { get; set; }
    public IEnumerable<TreeItem<string>> NewFiles { get; set; }
  }
}
