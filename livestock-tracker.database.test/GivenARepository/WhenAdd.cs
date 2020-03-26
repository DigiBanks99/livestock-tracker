using LivestockTracker.Database;
using LivestockTracker.Database.Test.Mocks;
using LivestockTracker.Database.Test.Models;
using System;
using System.Linq;
using Xunit;

namespace GivenARepository
{
  public class WhenAdd
  {
    [Fact]
    public void ItShouldAddTheItemToTheDataStore()
    {
      // Arrange
      using var mockContext = TestDbContextFactory.Create();
      using var repository = new Repository<TestEntity>(mockContext);
      var initialCount = repository.Count();
      var testEntity = new TestEntity
      {
        Id = 88
      };

      // Act
      var item = repository.Add(testEntity);
      repository.SaveChanges();

      // Assert
      Assert.Equal(initialCount + 1, repository.GetAll().Count());
      Assert.Equal(testEntity.Id, item.Id);
    }

    [Fact]
    public void AndIsAlreadyAddedItShouldThrowInvalidOperationException()
    {
      // Arrange
      using var mockContext = TestDbContextFactory.Create();
      using var repository = new Repository<TestEntity>(mockContext);
      var testEntity = new TestEntity
      {
        Id = 1
      };

      // Act
      var exception = Assert.Throws<InvalidOperationException>(() => repository.Add(testEntity));

      // Assert
      Assert.Contains($"The instance of entity type '{nameof(TestEntity)}' cannot be tracked because another instance with the same key value for {{'Id'}} is already being tracked.", exception.Message);
    }
  }
}
