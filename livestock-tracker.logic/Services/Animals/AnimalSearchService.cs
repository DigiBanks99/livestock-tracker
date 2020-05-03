using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Models.Animals;
using LivestockTracker.Abstractions.Services.Animals;
using LivestockTracker.Database;
using LivestockTracker.Models.Animals;
using LivestockTracker.Models.Paging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Logic.Services.Animals
{
    /// <summary>
    /// Provides search services for animals.
    /// </summary>
    public class AnimalSearchService : IAnimalSearchService
    {

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="mapper">The mapper.</param>
        /// <param name="livestockContext">The database context that contains the animals.</param>
        public AnimalSearchService(ILogger<AnimalSearchService> logger, IMapper<IAnimalSummary, AnimalSummary> mapper, LivestockContext livestockContext)
        {
            Logger = logger;
            Mapper = mapper;
            LivestockContext = livestockContext;
        }

        /// <summary>
        /// The Logger.
        /// </summary>
        protected ILogger Logger { get; }

        /// <summary>
        /// The mapper.
        /// </summary>
        protected IMapper<IAnimalSummary, AnimalSummary> Mapper { get; }

        /// <summary>
        /// The database context that contains the animals.
        /// </summary>
        protected LivestockContext LivestockContext { get; }

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
            where TSortProperty : IComparable
        {
            Logger.LogInformation($"Finding summarized animals...");
            return await LivestockContext.ConstrainedFind(filter, sort, sortDirection)
                                         .Select(animal => Mapper.Map(animal))
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
        public virtual async Task<IPagedData<IAnimalSummary>> FindAsync<TSortProperty>(Expression<Func<IAnimalSummary, bool>> filter,
                                                                                       Expression<Func<IAnimalSummary, TSortProperty>> sort,
                                                                                       ListSortDirection sortDirection,
                                                                                       IPagingOptions pagingOptions,
                                                                                       CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            Logger.LogInformation($"Finding {pagingOptions.PageSize} summarized animals for page {pagingOptions.PageNumber}...");
            var data = await LivestockContext.Animals
                                             .ConstrainedFind(filter, sort, sortDirection, pagingOptions)
                                             .Select(animal => Mapper.Map(animal))
                                             .ToListAsync(cancellationToken)
                                             .ConfigureAwait(false);

            var totalRecordCount = await LivestockContext.Animals
                                                          .CountAsync(cancellationToken)
                                                          .ConfigureAwait(false);

            var paginatedResults = new PagedData<AnimalSummary>(data, pagingOptions.PageSize, pagingOptions.PageNumber, totalRecordCount);
            Logger.LogDebug($"Found paged feed types: {paginatedResults}");
            return paginatedResults;
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
        public virtual Task<IPagedData<IAnimalSummary>> FindAsync<TSortProperty>(Expression<Func<IAnimalSummary, TSortProperty>> sort,
                                                                                 ListSortDirection sortDirection,
                                                                                 IPagingOptions pagingOptions,
                                                                                 CancellationToken cancellationToken)
            where TSortProperty : IComparable
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
        public virtual async Task<IAnimalSummary?> GetOneAsync(int key, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Finding a summarized animal that matches ID {key}...");
            var animal = await LivestockContext.Animals
                                                .FindAsync(new object[] { key }, cancellationToken)
                                                .ConfigureAwait(false);

            Logger.LogDebug($"Find animal of ID {key} result: {animal}");
            return Mapper.Map(animal);
        }
    }
}
