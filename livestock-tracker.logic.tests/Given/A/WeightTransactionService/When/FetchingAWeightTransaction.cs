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
    public class FetchingAWeightTransaction
    {
        private readonly ILogger<WeightTransactionCrudService> _logger;
        private readonly ILoggerFactory _loggerFactory;

        public FetchingAWeightTransaction(ITestOutputHelper testOutputHelper)
        {
            _logger = testOutputHelper.ToLogger<WeightTransactionCrudService>();
            _loggerFactory = testOutputHelper.ToLoggerFactory();
        }

        [Fact]
        public async Task ItShouldReturnTheTransaction()
        {
            // Arrange
            var context = LivestockDbContextFactory.Create(_loggerFactory);
            var service = SetUpService(context);
            var model = context.WeightTransactions.First();

            // Act
            var transaction = await service.GetSingleAsync(model.Id, CancellationToken.None)
                                           .ConfigureAwait(true);

            // Assert
            Assert.NotNull(transaction);
            if (transaction != null)
            {
                Assert.Equal(model.Id, transaction.Id);
                Assert.Equal(model.AnimalId, transaction.AnimalId);
                Assert.Equal(model.TransactionDate, transaction.TransactionDate);
                Assert.Equal(model.Weight, transaction.Weight);
            }
        }

        [Fact]
        public async Task ThatDoesNotExistItShouldReturnNull()
        {
            // Arrange
            var context = LivestockDbContextFactory.Create(_loggerFactory);
            var service = SetUpService(context);

            // Act
            var transaction = await service.GetSingleAsync(999, CancellationToken.None)
                                           .ConfigureAwait(true);

            // Assert
            Assert.Null(transaction);
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
