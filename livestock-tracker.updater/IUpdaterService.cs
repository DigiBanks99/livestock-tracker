using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LivestockTracker.Updater
{
  public interface IUpdaterService
  {
    UpdaterModel DetermineInitialUpdateInformation(string installPath = null);
  }
}
