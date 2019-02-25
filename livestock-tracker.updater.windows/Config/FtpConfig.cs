using LivestockTracker.Updater.Config;
using System.Linq;

namespace LivestockTracker.Updater.Windows.Config
{
  public class FtpConfig : BaseConfig, IFtpConfig
  {
    public FtpConfig() : base("ftp:")
    {
    }

    public string Server { get; private set; }

    public string Username { get; private set; }

    public string Password { get; private set; }

    protected override void Configure()
    {
      Server = _properties.FirstOrDefault(x => x.Key.ToLower() == nameof(Server).ToLower()).Value;
      Username = _properties.SingleOrDefault(x => x.Key.ToLower() == nameof(Username).ToLower()).Value;
      Password = _properties.SingleOrDefault(x => x.Key.ToLower() == nameof(Password).ToLower()).Value;
    }
  }
}
