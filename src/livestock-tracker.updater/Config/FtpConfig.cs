namespace LivestockTracker.Updater.Config
{
  public class FtpConfig
  {
    public const string Key = "Ftp";

    public string Server { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
  }
}
