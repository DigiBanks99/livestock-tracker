using LivestockTracker;
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
            using var context = TestDbContextFactory.Create();
            var testEntity = new TestEntity
            {
                Id = 1,
                Description = "A new description"
            };

            // Act
            context.Set<TestEntity>().Update(testEntity);
            context.SaveChanges();
            var updatedEntity = context.Set<TestEntity>().Find(testEntity.Id);

            // Assert
            Assert.Equal(testEntity.Description, updatedEntity.Description);
        }

        [Fact]
        public void AndEntityDoesNotExistItShouldThrowEntityNotFoundException()
        {
            // Arrange
            using var context = TestDbContextFactory.Create();
            var testEntity = new TestEntity
            {
                Id = 88,
                Description = "A new description"
            };

            // Act
            var result = context.Set<TestEntity>().Update(testEntity);
            var exception = Assert.Throws<EntityNotFoundException<TestEntity>>(() => context.Set<TestEntity>().Update(testEntity));

            // Assert
            Assert.Equal($"{typeof(TestEntity).Name} with id {testEntity.Id} not found.", exception.Message);
        }
    }
}
