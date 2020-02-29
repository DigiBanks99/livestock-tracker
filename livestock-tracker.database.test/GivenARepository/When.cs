using LivestockTracker.Database;
using LivestockTracker.Database.Test.Models;
using LivestockTracker.Database.Test.Resources;
using Microsoft.EntityFrameworkCore;
using Moq;
using System.Linq;
using Xunit;

namespace GivenARepository
{
  public class When
  {
    [Fact]
    public void GetAllItShouldReturnAllItemsInTheTable()
    {
      var repository = SetupRepository();
      var items = repository.GetAll();
      Assert.NotEmpty(items);
      Assert.Equal(1, items.First().Id);
      Assert.Equal(30, items.Last().Id);
    }

    private Repository<TestEntity> SetupRepository(Mock<DbSet<TestEntity>>? mockSet = null)
    {
      if (mockSet == null)
        mockSet = new Mock<DbSet<TestEntity>>();

      var mockContext = new Mock<DbContext>();
      mockContext.Setup(context => context.Set<TestEntity>()).Returns(mockSet.Object);

      var data = TestDataService.TestEntities.AsQueryable();
      mockSet.As<IQueryable<TestEntity>>().Setup(set => set.Provider).Returns(data.Provider);
      mockSet.As<IQueryable<TestEntity>>().Setup(set => set.Expression).Returns(data.Expression);
      mockSet.As<IQueryable<TestEntity>>().Setup(set => set.ElementType).Returns(data.ElementType);
      mockSet.As<IQueryable<TestEntity>>().Setup(set => set.GetEnumerator()).Returns(data.GetEnumerator());
      return new Repository<TestEntity>(mockContext.Object);
    }
  }
}
