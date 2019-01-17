using System;
using System.IO;
using System.Windows.Forms;

namespace LivestockTracker.Updater
{
  public class UpdaterService : IUpdaterService
  {
    public UpdaterModel DetermineInitialUpdateInformation()
    {
      return new UpdaterModel
      {
        InstallPath = Path.Combine("C:\\", "Programs", "livestock-tracker"),
        OldVersion = "1.0.0",
        NewVersion = Application.ProductVersion
      };
    }
  }
}
