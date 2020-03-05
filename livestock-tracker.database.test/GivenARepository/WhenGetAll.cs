using LivestockTracker.Database;
using LivestockTracker.Database.Test.Mocks;
using LivestockTracker.Database.Test.Models;
using System.Linq;
using Xunit;

namespace GivenARepository
{
  public class WhenGetAll
  {
    [Fact]
    public void ItShouldReturnAllItemsInTheTable()
    {
      using var mockContext = TestDbContextFactory.Create();
      using var repository = new Repository<TestEntity>(mockContext);

      var items = repository.GetAll();
      Assert.Equal(30, items.Count());
      Assert.Equal(1, items.First().Id);
      Assert.Equal(30, items.Last().Id);
    }
  }
}
