using LivestockTracker.Abstractions.Models.Weight;
using LivestockTracker.Database;
using LivestockTracker.Logic.Services.Weight;
using LivestockTracker.Logic.Tests;
using LivestockTracker.Logic.Tests.Factories;
using LivestockTracker.Logic.Tests.Seeders;
using LivestockTracker.Models.Paging;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace Given.A.WeightTransactionService.When
{
    public class SearchingForWeightTransactions
    {
        public static readonly object[][] IncludeFilterData = new object[][]
        {
            new object[] { new long[] { TestConstants.AnimalId1, TestConstants.AnimalId2, TestConstants.AnimalId5 }, new decimal?[2] { null, null }, 15 },
            new object[] { Array.Empty<long>(), new decimal?[2] { 0m, 39.99m }, 22 },
            new object[] { Array.Empty<long>(), new decimal?[2] { 39.99m, 80m }, 11 },
            new object[] { new long[] { TestConstants.AnimalId1 }, new decimal?[2] { 87.99m, null }, 2 },
            new object[] { new long[] { TestConstants.AnimalId1 }, new decimal?[2] { null, 120m }, 5 },
            new object[] { Array.Empty<long>(), new decimal?[2] { 120.00001m, null }, 0 }
        };

        public static readonly object[][] ExcludeFilterData = new object[][]
        {
            new object[] { new long[] { TestConstants.AnimalId1, TestConstants.AnimalId2, TestConstants.AnimalId5 }, new decimal?[2] { null, null }, 40 },
            new object[] { Array.Empty<long>(), new decimal?[2] { 0m, 39.99m }, 33 },
            new object[] { Array.Empty<long>(), new decimal?[2] { 39.99m, 80m }, 44 },
            new object[] { new long[] { TestConstants.AnimalId1 }, new decimal?[2] { 87.99m, null }, 30 },
            new object[] { new long[] { TestConstants.AnimalId1 }, new decimal?[2] { null, 120m }, 0 },
            new object[] { Array.Empty<long>(), new decimal?[2] { 120.00001m, null }, 55 }
        };

        public static readonly object[][] PaginationTestData = new object[][]
        {
            new object[] { 2, 10, 2 },
            new object[] { 10, 5, 5 },
            new object[] { 9, 5, 9 },
            new object[] { 50, 1, 5 },
            new object[] { 100, 0, 55 }
        };

        private readonly ILogger<WeightTransactionCrudService> _logger;
        private readonly ILoggerFactory _loggerFactory;

        private readonly IReadOnlyCollection<long> _animalIds = new long[]
        {
            TestConstants.AnimalId1,
            TestConstants.AnimalId2,
            TestConstants.AnimalId3,
            TestConstants.AnimalId4,
            TestConstants.AnimalId5,
            TestConstants.AnimalId6,
            TestConstants.AnimalId7,
            TestConstants.AnimalId8,
            TestConstants.AnimalId9,
            TestConstants.AnimalId10,
            TestConstants.AnimalId11
        };
        private readonly IReadOnlyCollection<(decimal, DateTimeOffset)> _data = new (decimal, DateTimeOffset)[]
        {
            (12, TestConstants.DefaultDate.AddDays(1)),
            (40, TestConstants.DefaultDate.AddDays(2)),
            (88, TestConstants.DefaultDate.AddDays(3)),
            (35, TestConstants.DefaultDate.AddDays(4)),
            (120, TestConstants.DefaultDate.AddDays(5))
        };

        public SearchingForWeightTransactions(ITestOutputHelper outputHelper)
        {
            _logger = outputHelper.ToLogger<WeightTransactionCrudService>();
            _loggerFactory = outputHelper.ToLoggerFactory();
        }

        [Theory]
        [MemberData(nameof(IncludeFilterData))]
        public async Task WithAnIncludeFilterItShouldIncludeTransactionsForTheFilterValues(long[] animalIds, decimal?[] bounds, int expectedCount)
        {
            // Arrange
            var filter = new WeightTransactionFilter();
            filter.AddAnimalIds(animalIds);
            filter.SetIncludeState(true);
            if (bounds[0] != null || bounds[1] != null)
            {
                filter.SetWeightBounds(bounds[0], bounds[1]);
            }

            var context = LivestockDbContextFactory.Create(_loggerFactory);
            var service = SetUpService(context);

            // Act
            var result = await service.FetchPagedAsync(filter,
                                                       new PagingOptions { PageNumber = 0, PageSize = int.MaxValue },
                                                       ListSortDirection.Ascending,
                                                       CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(expectedCount, result.Data.Count());
        }

        [Theory]
        [MemberData(nameof(ExcludeFilterData))]
        public async Task WithAnExcludeFilterItShouldExcludeTransactionsForTheFilterValues(long[] animalIds, decimal?[] bounds, int expectedCount)
        {
            // Arrange
            var filter = new WeightTransactionFilter();
            filter.AddAnimalIds(animalIds);
            filter.SetIncludeState(false);
            if (bounds[0] != null || bounds[1] != null)
            {
                filter.SetWeightBounds(bounds[0], bounds[1]);
            }

            var context = LivestockDbContextFactory.Create(_loggerFactory);
            var service = SetUpService(context);

            // Act
            var result = await service.FetchPagedAsync(filter,
                                                       new PagingOptions { PageNumber = 0, PageSize = int.MaxValue },
                                                       ListSortDirection.Ascending,
                                                       CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(expectedCount, result.Data.Count());
        }

        [Theory]
        [MemberData(nameof(PaginationTestData))]
        public async Task ItShouldRespectThePagingParameters(int pageSize, int pageNumber, int expectedCount)
        {
            // Arrange
            var filter = new WeightTransactionFilter();
            var context = LivestockDbContextFactory.Create(_loggerFactory);
            var service = SetUpService(context);

            // Act
            var result = await service.FetchPagedAsync(filter,
                                                       new PagingOptions
                                                       {
                                                           PageNumber = pageNumber,
                                                           PageSize = pageSize
                                                       },
                                                       ListSortDirection.Ascending,
                                                       CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(expectedCount, result.Data.Count());
            Assert.Equal(pageNumber, result.CurrentPage);
            Assert.True(pageSize >= result.Data.Count());
        }

        [Theory]
        [InlineData(ListSortDirection.Ascending, 1, 5)]
        [InlineData(ListSortDirection.Descending, 5, 1)]
        public async Task ItShouldSortTheResultsAccordingToTheCriteria(ListSortDirection sortDirection, int firstDays, int lastDays)
        {
            // Arrange
            var filter = new WeightTransactionFilter();
            var context = LivestockDbContextFactory.Create(_loggerFactory);
            var service = SetUpService(context);

            // Act
            var result = await service.FetchPagedAsync(filter,
                                                       new PagingOptions
                                                       {
                                                           PageNumber = 0,
                                                           PageSize = 100
                                                       },
                                                       sortDirection,
                                                       CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(55, result.Data.Count());
            Assert.Equal(TestConstants.DefaultDate.AddDays(firstDays), result.Data.First().TransactionDate);
            Assert.Equal(TestConstants.DefaultDate.AddDays(lastDays), result.Data.Last().TransactionDate);
        }

        private WeightTransactionCrudService SetUpService(LivestockContext context)
        {
            foreach (var animalId in _animalIds)
            {
                context.SeedTestAnimal(animalId);

                foreach (var data in _data)
                {
                    context.SeedWeightTransaction(animalId, transactionDate: data.Item2, weight: data.Item1);
                }
            }

            context.SaveChanges();
            return new WeightTransactionCrudService(_logger, context);
        }
    }
}
