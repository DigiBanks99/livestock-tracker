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
      using var context = TestDbContextFactory.Create();

      var items = context.Set<TestEntity>().ToList();
      Assert.Equal(30, items.Count);
      Assert.Equal(1, items.First().Id);
      Assert.Equal(30, items.Last().Id);
    }
  }
}
