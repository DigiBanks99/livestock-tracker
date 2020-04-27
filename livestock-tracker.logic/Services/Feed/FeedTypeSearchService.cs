using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Models.Feed;
using LivestockTracker.Abstractions.Services.Feed;
using LivestockTracker.Database;
using LivestockTracker.Models;
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

namespace LivestockTracker.Logic.Services.Feed
{
    /// <summary>
    /// Provides search services for animals.
    /// </summary>
    public class FeedTypeSearchService : IFeedTypeSearchService
    {
        ///<summary>
        /// The constructor
        ///</summary>
        ///<param name="logger">The logger.</param>
        ///<param name="mapper">The mapper.</param>
        ///<param name="livestockContext">The context that contains feed types.</param>
        public FeedTypeSearchService(ILogger<FeedTypeSearchService> logger, IMapper<IFeedType, FeedType> mapper, LivestockContext livestockContext)
        {
            Logger = logger;
            Mapper = mapper;
            LivestockContext = livestockContext;
        }

        /// <summary>
        /// The logger.
        /// </summary>
        protected ILogger Logger { get; }

        /// <summary>
        /// The mapper.
        /// </summary>
        protected IMapper<IFeedType, FeedType> Mapper { get; }

        /// <summary>
        /// The context that contains feed types.
        /// </summary>
        protected LivestockContext LivestockContext { get; }

        /// <summary>
        /// Finds the feed types that match the filter condition sorted as specified.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
        /// <param name="filter">The condition that filters the feed types that need to be included.</param>
        /// <param name="sort">The condition that defines the sorting property.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="pagingOptions">The options for pagination.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The sorted list of feed types that match the filter.</returns>
        public virtual async Task<IPagedData<IFeedType>> FindAsync<TSortProperty>(Expression<Func<IFeedType, bool>> filter,
                                                                                  Expression<Func<IFeedType, TSortProperty>> sort,
                                                                                  ListSortDirection sortDirection,
                                                                                  IPagingOptions pagingOptions,
                                                                                  CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            Logger.LogInformation($"Finding {pagingOptions.PageSize} feed types for page {pagingOptions.PageNumber}...");
            var data = await LivestockContext.FeedTypes
                                             .ConstrainedFind(filter, sort, sortDirection, pagingOptions)
                                             .Select(feedType => Mapper.Map(feedType))
                                             .ToListAsync(cancellationToken)
                                             .ConfigureAwait(false);

            var totalRecordCount = await LivestockContext.FeedTypes
                                                         .Where(filter)
                                                         .CountAsync(cancellationToken)
                                                         .ConfigureAwait(false);

            var paginatedResults = new PagedData<FeedType>(data, pagingOptions.PageSize, pagingOptions.PageNumber, totalRecordCount);
            Logger.LogDebug($"Found paged feed types: {paginatedResults}");
            return paginatedResults;
        }

        /// <summary>
        /// Finds the feed types sorted as specified.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
        /// <param name="sort">The condition that defines the sorting property.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="pagingOptions">The options for pagination.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The sorted list of feed types.</returns>
        public virtual Task<IPagedData<IFeedType>> FindAsync<TSortProperty>(Expression<Func<IFeedType, TSortProperty>> sort,
                                                                            ListSortDirection sortDirection,
                                                                            IPagingOptions pagingOptions,
                                                                            CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            return FindAsync(_ => true, sort, sortDirection, pagingOptions, cancellationToken);
        }

        /// <summary>
        /// Finds the feed types that match the filter condition sorted as specified.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
        /// <param name="filter">The condition that filters the feed types that need to be included.</param>
        /// <param name="sort">The condition that defines the sorting property.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The sorted list of animals that match the filter.</returns>
        public virtual async Task<IEnumerable<IFeedType>> FindAsync<TSortProperty>(Expression<Func<IFeedType, bool>> filter,
                                                                                   Expression<Func<IFeedType, TSortProperty>> sort,
                                                                                   ListSortDirection sortDirection,
                                                                                   CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            Logger.LogInformation($"Finding feed types...");
            return await LivestockContext.FeedTypes
                                         .ConstrainedFind(filter, sort, sortDirection)
                                         .Where(feedType => !feedType.Deleted)
                                         .Select(feedType => Mapper.Map(feedType))
                                         .ToListAsync(cancellationToken)
                                         .ConfigureAwait(false);
        }

        /// <summary>
        /// Finds a feed type that matches a given key.
        /// </summary>
        /// <param name="key">The feed type's ID.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>
        ///     <list type="bullet">
        ///         <item>A feed type if found.</item>
        ///         <item>Null if not found.</item>
        ///     </list>
        /// </returns>
        public virtual async Task<IFeedType?> GetOneAsync(int key, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Finding a feed type that matches ID {key}...");
            var feedType = await LivestockContext.FeedTypes
                                                 .FindAsync(new object[] { key }, cancellationToken)
                                                 .ConfigureAwait(false);

            Logger.LogDebug($"Find feed type of ID {key} result: {feedType}");
            return Mapper.Map(feedType);
        }
    }
}
