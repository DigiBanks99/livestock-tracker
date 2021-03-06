using LivestockTracker;
using LivestockTracker.Database.Test.Mocks;
using LivestockTracker.Database.Test.Models;
using LivestockTracker.Database.Test.Resources;
using System;
using Xunit;

namespace GivenARepository
{
    public class WhenGet
    {
        [Theory]
        [InlineData(1)]
        [InlineData(5)]
        [InlineData(13)]
        [InlineData(24)]
        [InlineData(30)]
        public void ItShouldReturnOnlyTheItemWithTheMatchingId(int id)
        {
            // Arrange
            using TestDbContext context = TestDbContextFactory.Create();

            // Act
            TestEntity item = context.Set<TestEntity>().Find(id);

            // Assert
            Assert.Equal(item.Id, TestDataService.TestEntities[id - 1].Id);
        }

        [Theory]
        [InlineData(31)]
        [InlineData(32)]
        [InlineData(33)]
        [InlineData(99)]
        public void AndTheEntityIsNotFoundItShouldThrowAnEntityNotFoundException(int id)
        {
            // Arrange
            using TestDbContext context = TestDbContextFactory.Create();

            // Act
            EntityNotFoundException<TestEntity> exception = Assert.Throws<EntityNotFoundException<TestEntity>>(() =>
      {
          context.Set<TestEntity>().Find(id);
      });

            // Assert
            Assert.Equal($"{typeof(TestEntity).Name} with id {id} not found.", exception.Message);
        }

        [Fact]
        public void AndTheIdIsNegativeItShouldThrowAnArgumentOutOfRangeException()
        {
            // Arrange
            using TestDbContext context = TestDbContextFactory.Create();

            // Act and Assert
            Assert.Throws<ArgumentOutOfRangeException>(() =>
            {
                context.Set<TestEntity>().Find(-1);
            });
        }
    }
}
