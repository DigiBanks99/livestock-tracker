namespace LivestockTracker.Database.Test.Models
{
  public class TestEntity : IEntity
  {
    public int Id { get; set; }
    public string? Description { get; set; }

    public int GetKey()
    {
      return Id;
    }
  }
}
