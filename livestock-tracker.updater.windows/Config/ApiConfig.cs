using LivestockTracker.Updater.Config;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;

namespace LivestockTracker.Updater.Windows.Config
{
  public class ApiConfig : IApiConfig
  {
    private string _settingsPrefix;

    public ApiConfig()
    {
      _settingsPrefix = "api:";
      Configure();
    }

    public string BaseUrl { get; private set; }

    public string VersionRoute { get; private set; }

    public void Configure()
    {

      var settings = ConfigurationManager.AppSettings.AllKeys.Select(k => new KeyValuePair<string, string>(k, ConfigurationManager.AppSettings[k]));
      var pairs = settings.Where(s => s.Key.StartsWith(_settingsPrefix))
                          .Select(k => new KeyValuePair<string, string>(k.Key.Substring(_settingsPrefix.Length), Environment.ExpandEnvironmentVariables(k.Value)));

      BaseUrl = pairs.FirstOrDefault(p => p.Key.ToLower() == nameof(BaseUrl).ToLower()).Value;
      VersionRoute = pairs.FirstOrDefault(p => p.Key.ToLower() == nameof(VersionRoute).ToLower()).Value;
    }
  }
}
