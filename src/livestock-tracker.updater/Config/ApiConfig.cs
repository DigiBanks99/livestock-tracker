namespace LivestockTracker.Updater.Config
{
  public class ApiConfig
  {
    public const string Key = "Api";

    public string BaseUrl { get; set; }
    public string VersionRoute { get; set; }
  }
}
