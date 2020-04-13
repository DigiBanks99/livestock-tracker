using LivestockTracker.Abstractions.Data;

namespace LivestockTracker.Database.Test.Models
{
    public class TestEntity : IEntity<int>
  {
    public int Id { get; set; }
    public string? Description { get; set; }

    public int GetKey()
    {
      return Id;
    }
  }
}
