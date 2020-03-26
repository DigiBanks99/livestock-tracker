using LivestockTracker;
using LivestockTracker.Database;
using LivestockTracker.Database.Test.Mocks;
using LivestockTracker.Database.Test.Models;
using Xunit;

namespace GivenARepository
{
  public class WhenUpdate
  {
    [Fact]
    public void ItShouldSetTheValues()
    {
      // Arrange
      using var mockContext = TestDbContextFactory.Create();
      using var repository = new Repository<TestEntity>(mockContext);
      var testEntity = new TestEntity
      {
        Id = 1,
        Description = "A new description"
      };

      // Act
      repository.Update(testEntity);
      repository.SaveChanges();
      var updatedEntity = repository.Get(testEntity.Id);

      // Assert
      Assert.Equal(testEntity.Description, updatedEntity.Description);
    }

    [Fact]
    public void AndEntityDoesNotExistItShouldThrowEntityNotFoundException()
    {
      // Arrange
      using var mockContext = TestDbContextFactory.Create();
      using var repository = new Repository<TestEntity>(mockContext);
      var testEntity = new TestEntity
      {
        Id = 88,
        Description = "A new description"
      };

      // Act
      var exception = Assert.Throws<EntityNotFoundException<TestEntity>>(() =>repository.Update(testEntity));

      // Assert
      Assert.Equal($"{typeof(TestEntity).Name} with id {testEntity.Id} not found.", exception.Message);
    }
  }
}
