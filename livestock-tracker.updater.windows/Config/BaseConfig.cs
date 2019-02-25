using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;

namespace LivestockTracker.Updater.Windows.Config
{
  public abstract class BaseConfig
  {
    private readonly string _settingsPrefix;
    protected IEnumerable<KeyValuePair<string, string>> _properties;

    public BaseConfig(string settingsPrefix)
    {
      _settingsPrefix = settingsPrefix;
      DetermineProperties();
      Configure();
    }

    private void DetermineProperties()
    {
      var settings = ConfigurationManager.AppSettings.AllKeys.Select(k => new KeyValuePair<string, string>(k, ConfigurationManager.AppSettings[k]));
      _properties = settings.Where(s => s.Key.StartsWith(_settingsPrefix))
                          .Select(k => new KeyValuePair<string, string>(k.Key.Substring(_settingsPrefix.Length), Environment.ExpandEnvironmentVariables(k.Value)));
    }

    protected abstract void Configure();
  }
}
