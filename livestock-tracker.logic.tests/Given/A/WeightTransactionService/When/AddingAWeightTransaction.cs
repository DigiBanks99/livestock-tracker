using LivestockTracker.Abstractions.Models.Weight;
using LivestockTracker.Exceptions;
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
    public class AddingAWeightTransaction
    {
        private readonly ILogger<WeightTransactionCrudService> _logger;
        private readonly ILoggerFactory _loggerFactory;

        public AddingAWeightTransaction(ITestOutputHelper testOutputHelper)
        {
            _logger = testOutputHelper.ToLogger<WeightTransactionCrudService>();
            _loggerFactory = testOutputHelper.ToLoggerFactory();
        }

        [Fact]
        public async Task ThatDoesNotExistItShouldAddItToTheDatabase()
        {
            // Arrange
            var context = LivestockDbContextFactory.Create(_loggerFactory);
            context.SeedTestAnimal(TestConstants.AnimalId1);
            context.SaveChanges();
            var service = new WeightTransactionCrudService(_logger, context);

            // Act
            var transaction = new WeightTransaction
            {
                AnimalId = TestConstants.AnimalId1,
                TransactionDate = TestConstants.DefaultDate,
                Weight = 100
            };
            await service.AddAsync(transaction, CancellationToken.None);

            // Assert
            Assert.Equal(1, context.WeightTransactions.Count());
        }

        [Fact]
        public async Task ForAnAnimalThatDoesNotExistItShouldThrow()
        {
            // Arrange
            var context = LivestockDbContextFactory.Create(_loggerFactory);
            var service = new WeightTransactionCrudService(_logger, context);

            // Act
            var transaction = new WeightTransaction
            {
                AnimalId = TestConstants.AnimalId1,
                TransactionDate = TestConstants.DefaultDate,
                Weight = 100
            };
            var exception = await Assert.ThrowsAsync<TransactionRequiresAnimalException>(async () => await service.AddAsync(transaction, CancellationToken.None));

            // Assert
            Assert.NotNull(exception);
            Assert.Equal(TestConstants.AnimalId1, exception.AnimalId);
            Assert.Equal("The animal for this transaction could not be found.", exception.Message);
        }
    }
}
