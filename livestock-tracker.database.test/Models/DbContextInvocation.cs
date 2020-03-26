namespace LivestockTracker.Database.Test.Models
{
  public class DbContextInvocation
  {
    public string? MethodName { get; set; }
    public object[]? Arguments { get; set; }
    public int Count { get; set; }
  }
}
