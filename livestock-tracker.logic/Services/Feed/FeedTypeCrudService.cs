using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models.Feed;
using LivestockTracker.Abstractions.Services.Feed;
using LivestockTracker.Database;
using LivestockTracker.Database.Models.Feed;
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
    /// Provides create, read, update and delete services for feed types.
    /// </summary>
    public class FeedTypeCrudService : IFeedTypeCrudService
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="mapper">The mapper.</param>
        /// <param name="livestockContext">The database context that contains the feed types.</param>
        public FeedTypeCrudService(ILogger<FeedTypeCrudService> logger, IMapper<FeedTypeModel, IFeedType> mapper, LivestockContext livestockContext)
        {
            Logger = logger;
            Mapper = mapper;
            LivestockContext = livestockContext;
        }

        /// <summary>
        /// The logger.
        /// </summary>
        public ILogger Logger { get; }

        /// <summary>
        /// The mapper.
        /// </summary>
        public IMapper<FeedTypeModel, IFeedType> Mapper { get; }

        /// <summary>
        /// The database context that contains the feed types.
        /// </summary>
        public LivestockContext LivestockContext { get; }

        /// <summary>
        /// Attempts to add a new feed type to the persisted store.
        /// </summary>
        /// <param name="item">The feed type to be added.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The added feed type.</returns>
        public virtual async Task<IFeedType> AddAsync(IFeedType item, CancellationToken cancellationToken)
        {
            Logger.LogInformation("Adding a feed type...");

            var entity = Mapper.Map(item);
            var changes = await LivestockContext.FeedTypes
                                                .AddAsync(entity, cancellationToken)
                                                .ConfigureAwait(false);
            await LivestockContext.SaveChangesAsync(cancellationToken)
                                  .ConfigureAwait(false);

            return Mapper.Map(changes.Entity);
        }

        /// <summary>
        /// Finds a feed type in the persisted store based on the provided predicate and sorting options.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
        /// <param name="filter">The filter predicate which specifies the conditions to include a feed type.</param>
        /// <param name="sort">The function that returns the sort property on the feed type.</param>
        /// <param name="sortDirection">Either ascending or descending.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The enumerable collection of feed types that match the criteria.</returns>
        public virtual async Task<IEnumerable<IFeedType>> FindAsync<TSortProperty>(Expression<Func<IFeedType, bool>> filter,
                                                                                   Expression<Func<IFeedType, TSortProperty>> sort,
                                                                                   ListSortDirection sortDirection,
                                                                                   CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            Logger.LogInformation("Finding feed types...");
            return await LivestockContext.FeedTypes
                                         .Where(feedType => !feedType.Deleted)
                                         .ConstrainedFind(filter, sort, sortDirection)
                                         .Select(feedType => Mapper.Map(feedType))
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

        /// <summary>
        /// Flags the record in the persisted store as Deleted. It does not physically delete the record
        /// to ensure relationships for history items are kept intact.
        /// </summary>
        /// <param name="key">The ID for the feed type.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The ID of the feed type that was marked as Deleted.</returns>
        public virtual async Task<int> RemoveAsync(int key, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Marking the feed type with ID {key} as deleted...");

            var entity = await LivestockContext.FeedTypes
                                               .FindAsync(new object[] { key }, cancellationToken)
                                               .ConfigureAwait(false);
            if (entity == null)
                throw new EntityNotFoundException<FeedTypeModel>(key);

            entity.Deleted = true;
            var changes = LivestockContext.Update(entity);
            await LivestockContext.SaveChangesAsync(cancellationToken)
                                  .ConfigureAwait(false);

            Logger.LogDebug($"Feed type with ID {key} marked as deleted...");
            return changes.Entity.Id;
        }

        /// <summary>
        /// Updates the properties of an feed type in the persisted store.
        /// </summary>
        /// <param name="item">The feed type with its desired values.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The updated feed type.</returns>
        /// <exception cref="EntityNotFoundException{IFeedType}">When the feed type with the given key is not found.</exception>
        public virtual async Task<IFeedType> UpdateAsync(IFeedType item, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Updating the feed type with ID {item.Id}...");

            var entity = await LivestockContext.FeedTypes
                                               .FindAsync(new object[] { item.Id }, cancellationToken)
                                               .ConfigureAwait(false);
            if (entity == null)
                throw new EntityNotFoundException<FeedTypeModel>(item.Id);

            entity.Description = item.Description;

            var changes = LivestockContext.FeedTypes.Update(entity);
            await LivestockContext.SaveChangesAsync(cancellationToken)
                                  .ConfigureAwait(false);

            return Mapper.Map(changes.Entity);
        }
    }
}
