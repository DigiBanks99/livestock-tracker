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
            using TestDbContext context = TestDbContextFactory.Create();
            int initialCount = context.Set<TestEntity>().Count();
            TestEntity testEntity = new TestEntity
            {
                Id = 88
            };

            // Act
            var item = context.Set<TestEntity>().Add(testEntity);
            context.SaveChanges();

            // Assert
            Assert.Equal(initialCount + 1, context.Set<TestEntity>().Count());
            Assert.Equal(testEntity.Id, item.Entity.Id);
        }

        [Fact]
        public void AndIsAlreadyAddedItShouldThrowInvalidOperationException()
        {
            // Arrange
            using TestDbContext context = TestDbContextFactory.Create();
            TestEntity testEntity = new TestEntity
            {
                Id = 1
            };

            // Act
            InvalidOperationException exception = Assert.Throws<InvalidOperationException>(() => context.Add(testEntity));

            // Assert
            Assert.Contains($"The instance of entity type '{nameof(TestEntity)}' cannot be tracked because another instance with the same key value for {{'Id'}} is already being tracked.", exception.Message);
        }
    }
}
