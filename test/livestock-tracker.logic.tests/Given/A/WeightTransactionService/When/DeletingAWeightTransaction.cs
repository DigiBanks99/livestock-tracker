using LivestockTracker;
using LivestockTracker.Abstractions.Models.Weight;
using LivestockTracker.Database;
using LivestockTracker.Logic.Services.Weight;
using LivestockTracker.Logic.Tests;
using LivestockTracker.Logic.Tests.Factories;
using LivestockTracker.Logic.Tests.Seeders;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace Given.A.WeightTransactionService.When
{
    public class DeletingAWeightTransaction
    {
        private readonly ILogger<WeightTransactionCrudService> _logger;
        private readonly ILoggerFactory _loggerFactory;

        public DeletingAWeightTransaction(ITestOutputHelper outputHelper)
        {
            _logger = outputHelper.ToLogger<WeightTransactionCrudService>();
            _loggerFactory = outputHelper.ToLoggerFactory();
        }

        [Fact]
        public async Task ItShouldRemoveTheRecordFromTheDatabase()
        {
            // Arrange
            var context = LivestockDbContextFactory.Create(_loggerFactory);
            var service = SetUpService(context);
            var id = context.WeightTransactions.Select(transaction => transaction.Id).First();

            // Act
            var result = await service.RemoveAsync(id, CancellationToken.None).ConfigureAwait(true);

            // Assert
            Assert.Equal(id, result);
            Assert.Empty(context.WeightTransactions);
        }

        [Fact]
        public async Task ThatDoesNotExistItShouldThrow()
        {
            // Arrange
            var context = LivestockDbContextFactory.Create(_loggerFactory);
            var service = SetUpService(context);
            var id = 999;

            // Act
            var exception = await Assert.ThrowsAsync<EntityNotFoundException<WeightTransaction>>(
                                        async () =>
                                        {
                                            await service.RemoveAsync(id, CancellationToken.None)
                                                         .ConfigureAwait(true);
                                        })
                                        .ConfigureAwait(true);

            // Assert
            Assert.NotNull(exception);
            Assert.Equal($"{nameof(WeightTransaction)} with id {id} not found.", exception.Message);
            Assert.NotEmpty(context.WeightTransactions);
        }

        private WeightTransactionCrudService SetUpService(LivestockContext context)
        {
            context.SeedTestAnimal(TestConstants.AnimalId1);
            context.SeedTestAnimal(TestConstants.AnimalId2);
            context.SeedWeightTransaction(TestConstants.AnimalId1);
            context.SaveChanges();
            return new WeightTransactionCrudService(_logger, context);
        }
    }
}
