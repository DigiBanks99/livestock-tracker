using LivestockTracker.Updater.Config;
using System.Linq;

namespace LivestockTracker.Updater.Windows.Config
{
  public class ApiConfig : BaseConfig, IApiConfig
  {
    public ApiConfig() : base("api:")
    {
    }

    public string BaseUrl { get; private set; }

    public string VersionRoute { get; private set; }

    protected override void Configure()
    {
      BaseUrl = _properties.FirstOrDefault(p => p.Key.ToLower() == nameof(BaseUrl).ToLower()).Value;
      VersionRoute = _properties.FirstOrDefault(p => p.Key.ToLower() == nameof(VersionRoute).ToLower()).Value;
    }
  }
}
