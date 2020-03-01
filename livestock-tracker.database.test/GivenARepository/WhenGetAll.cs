using LivestockTracker.Database;
using LivestockTracker.Database.Test.Mocks;
using LivestockTracker.Database.Test.Models;
using LivestockTracker.Database.Test.Resources;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Xunit;

namespace GivenARepository
{
  public class WhenGetAll
  {
    [Fact]
    public void ItShouldReturnAllItemsInTheTable()
    {
      var contextBuilder = new DbContextOptionsBuilder<TestDbContext>()
        .UseInMemoryDatabase(databaseName: "TestRepository")
        .Options;

      var mockContext = new TestDbContext(contextBuilder);
      mockContext.AddRange(TestDataService.TestEntities);
      mockContext.SaveChanges();
      var repository = new Repository<TestEntity>(mockContext);

      var items = repository.GetAll();
      Assert.Equal(30, items.Count());
      Assert.Equal(1, items.First().Id);
      Assert.Equal(30, items.Last().Id);

      repository.Dispose();
      mockContext.Dispose();
    }
  }
}
