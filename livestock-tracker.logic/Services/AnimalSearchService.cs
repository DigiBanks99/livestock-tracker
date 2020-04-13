using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Services;
using LivestockTracker.Database;
using LivestockTracker.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Logic.Services
{
    public class AnimalSearchService : IFetchAsyncService<IAnimalSummary, int>, IPagedFetchAsyncService<IAnimalSummary>
    {
        private readonly ILogger _logger;
        private readonly IMapper<IAnimalSummary, AnimalSummary> _mapper;
        private readonly LivestockContext _livestockContext;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="mapper">The mapper.</param>
        /// <param name="livestockContext">The database context.</param>
        public AnimalSearchService(ILogger<AnimalSearchService> logger, IMapper<IAnimalSummary, AnimalSummary> mapper, LivestockContext livestockContext)
        {
            _logger = logger;
            _mapper = mapper;
            _livestockContext = livestockContext;
        }

        /// <summary>
        /// Finds the animals that match the filter condition sorted as specified.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
        /// <param name="filter">The condition that filters the animals that need to be included.</param>
        /// <param name="sort">The condition that defines the sorting property.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The sorted list of animals that match the filter.</returns>
        public async Task<IEnumerable<IAnimalSummary>> FindAsync<TSortProperty>(Expression<Func<IAnimalSummary, bool>> filter,
                                                                                Expression<Func<IAnimalSummary, TSortProperty>> sort,
                                                                                ListSortDirection sortDirection,
                                                                                CancellationToken cancellationToken)
            where TSortProperty : IConvertible
        {
            _logger.LogInformation($"Finding summarized animals...");
            var query = _livestockContext.Animal
                                         .Where(filter);

            var orderedQuery = sortDirection == ListSortDirection.Ascending ?
                query.OrderBy(sort) :
                query.OrderByDescending(sort);

            return await orderedQuery.Select(animal => _mapper.Map(animal))
                                     .ToListAsync(cancellationToken)
                                     .ConfigureAwait(false);
        }

        /// <summary>
        /// Finds the animals that match the filter condition sorted as specified.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
        /// <param name="filter">The condition that filters the animals that need to be included.</param>
        /// <param name="sort">The condition that defines the sorting property.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="pagingOptions">The options for pagination.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The sorted list of animals that match the filter.</returns>
        public async Task<IPagedData<IAnimalSummary>> FindAsync<TSortProperty>(Expression<Func<IAnimalSummary, bool>> filter,
                                                                               Expression<Func<IAnimalSummary, TSortProperty>> sort,
                                                                               ListSortDirection sortDirection,
                                                                               IPagingOptions pagingOptions,
                                                                               CancellationToken cancellationToken)
            where TSortProperty : IConvertible
        {
            _logger.LogInformation($"Finding {pagingOptions.PageSize} summarized animals page {pagingOptions.PageNumber}...");
            var query = _livestockContext.Animal
                                         .Where(filter);

            var orderedQuery = sortDirection == ListSortDirection.Ascending ?
                query.OrderBy(sort) :
                query.OrderByDescending(sort);

            var data = await orderedQuery.Select(animal => _mapper.Map(animal))
                                         .Take(pagingOptions.PageSize)
                                         .Skip(pagingOptions.PageNumber)
                                         .ToListAsync(cancellationToken)
                                         .ConfigureAwait(false);

            var totalRecordCount = await _livestockContext.Animal
                                                          .CountAsync(cancellationToken)
                                                          .ConfigureAwait(false);

            return new PagedData<AnimalSummary>(data, pagingOptions.PageSize, pagingOptions.PageNumber, totalRecordCount);
        }

        /// <summary>
        /// Finds the animals that match the filter condition sorted as specified.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
        /// <param name="sort">The condition that defines the sorting property.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="pagingOptions">The options for pagination.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The sorted list of animals that match the filter.</returns>
        public Task<IPagedData<IAnimalSummary>> FindAsync<TSortProperty>(Expression<Func<IAnimalSummary, TSortProperty>> sort,
                                                                         ListSortDirection sortDirection,
                                                                         IPagingOptions pagingOptions,
                                                                         CancellationToken cancellationToken)
            where TSortProperty : IConvertible
        {
            return FindAsync(animal => true, sort, sortDirection, pagingOptions, cancellationToken);
        }

        /// <summary>
        /// Finds a summarized animal that matches a given key.
        /// </summary>
        /// <param name="key">The animal's ID.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>
        ///     <list type="bullet">
        ///         <item>A summarized animal if found.</item>
        ///         <item>Null if not found.</item>
        ///     </list>
        /// </returns>
        public async Task<IAnimalSummary?> GetOneAsync(int key, CancellationToken cancellationToken)
        {
            _logger.LogInformation($"Finding a summarized animal that matches ID {key}...");
            var animal = await _livestockContext.Animal
                                                .FindAsync(new object[] { key }, cancellationToken)
                                                .ConfigureAwait(false);

            return _mapper.Map(animal);
        }
    }
}
