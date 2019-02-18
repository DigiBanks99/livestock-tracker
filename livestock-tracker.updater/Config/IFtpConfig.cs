using System;
using System.Collections.Generic;
using System.Text;

namespace LivestockTracker.Updater.Config
{
  public interface IFtpConfig
  {
    string Server { get; }
    string Username { get; }
    string Password { get; }
  }
}
