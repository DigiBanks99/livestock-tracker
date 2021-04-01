using LivestockTracker;
using LivestockTracker.Abstractions.Models.Weight;
using LivestockTracker.Database;
using LivestockTracker.Logic.Mappers.Weight;
using LivestockTracker.Logic.Services.Weight;
using LivestockTracker.Logic.Tests;
using LivestockTracker.Logic.Tests.Factories;
using LivestockTracker.Logic.Tests.Seeders;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace Given.A.WeightTransactionService.When
{
    public class UpdatingAWeightTransaction
    {
        private readonly ILogger<WeightTransactionCrudService> _logger;
        private readonly ILoggerFactory _loggerFactory;

        public UpdatingAWeightTransaction(ITestOutputHelper outputHelper)
        {
            _logger = outputHelper.ToLogger<WeightTransactionCrudService>();
            _loggerFactory = outputHelper.ToLoggerFactory();
        }

        [Fact]
        public async Task ThatExistsItShouldSetTheNewValues()
        {
            // Arrange
            var context = LivestockDbContextFactory.Create(_loggerFactory);
            var service = SetUpService(context);
            var transaction = context.WeightTransactions.First().MapToWeightTransaction();
            transaction.Weight += 44;
            transaction.TransactionDate = transaction.TransactionDate.AddDays(3);

            // Act
            var result = await service.UpdateAsync(transaction, CancellationToken.None).ConfigureAwait(true);
            var model = context.WeightTransactions.Find(transaction.Id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(transaction.Weight, model.Weight);
            Assert.Equal(transaction.Weight, result.Weight);
            Assert.Equal(transaction.TransactionDate, model.TransactionDate);
            Assert.Equal(transaction.TransactionDate, result.TransactionDate);
        }

        [Fact]
        public async Task AndAttemptingToChangeTheAnimalItShouldThrow()
        {
            // Arrange
            var context = LivestockDbContextFactory.Create(_loggerFactory);
            var service = SetUpService(context);
            var transaction = context.WeightTransactions.First().MapToWeightTransaction();
            transaction.AnimalId = TestConstants.AnimalId2;

            // Act
            var exception = await Assert.ThrowsAsync<InvalidOperationException>(
                                         async () =>
                                         {
                                             await service.UpdateAsync(transaction, CancellationToken.None)
                                                          .ConfigureAwait(true);
                                         })
                                        .ConfigureAwait(true);

            // Assert
            Assert.NotNull(exception);
            Assert.Equal("Cannot move a transaction to a different animal.", exception.Message);
        }

        [Fact]
        public async Task ThatDoesNotExistItShouldThrow()
        {
            // Arrange
            var context = LivestockDbContextFactory.Create(_loggerFactory);
            var service = SetUpService(context);
            var transaction = new WeightTransaction
            {
                Id = 999,
                AnimalId = TestConstants.AnimalId1,
                TransactionDate = TestConstants.DefaultDate,
                Weight = 120
            };

            // Act
            var exception = await Assert.ThrowsAsync<EntityNotFoundException<WeightTransaction>>(
                                         async () =>
                                         {
                                             await service.UpdateAsync(transaction, CancellationToken.None)
                                                          .ConfigureAwait(true);
                                         })
                                        .ConfigureAwait(true);

            // Assert
            Assert.NotNull(exception);
            Assert.Equal($"{nameof(WeightTransaction)} with id {transaction.Id} not found.", exception.Message);
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
