using LivestockTracker.Updater.Config;
using System.Linq;

namespace LivestockTracker.Updater.Windows.Config
{
  public class ApplicationConfig : BaseConfig, IApplicationConfig
  {
    public ApplicationConfig() : base("app:")
    {
    }

    public string DefaultInstallPath { get; private set; }

    protected override void Configure()
    {
      DefaultInstallPath = _properties.FirstOrDefault(p => p.Key.ToLower() == nameof(DefaultInstallPath).ToLower()).Value;
    }
  }
}
