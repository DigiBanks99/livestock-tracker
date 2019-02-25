namespace LivestockTracker.Updater.Config
{
  public interface IApiConfig
  {
    string BaseUrl { get; }
    string VersionRoute { get; }
  }
}
