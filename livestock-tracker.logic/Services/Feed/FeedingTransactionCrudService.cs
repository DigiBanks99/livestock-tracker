using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Models.Feed;
using LivestockTracker.Abstractions.Services.Feed;
using LivestockTracker.Database;
using LivestockTracker.Database.Models.Feed;
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
    /// Provides create, read, update and delete services for feeding transactions.
    /// </summary>
    public class FeedingTransactionCrudService : IFeedingTransactionCrudService
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="mapper">The mapper.</param>
        /// <param name="livestockContext">The database context that contains the feeding transactions table.</param>
        public FeedingTransactionCrudService(ILogger<FeedingTransactionCrudService> logger,
                                             IMapper<FeedingTransactionModel, IFeedingTransaction> mapper,
                                             LivestockContext livestockContext)
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
        protected IMapper<FeedingTransactionModel, IFeedingTransaction> Mapper { get; }

        /// <summary>
        /// The database context that contains the feeding transactions table.
        /// </summary>
        protected LivestockContext LivestockContext { get; }

        /// <summary>
        /// Attempts to add a feeding transaction to the database context.
        /// </summary>
        /// <param name="item">The object that contains the information for the new feeding transaction.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The added feeding transaction.</returns>
        public virtual async Task<IFeedingTransaction> AddAsync(IFeedingTransaction item, CancellationToken cancellationToken)
        {
            Logger.LogInformation("Adding a feeding transaction...");

            var entity = Mapper.Map(item);
            var changes = await LivestockContext.FeedingTransactions.AddAsync(entity, cancellationToken).ConfigureAwait(false);
            await LivestockContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

            return Mapper.Map(changes.Entity);
        }

        /// <summary>
        /// Finds a collection of feeding transactions that match a certain criteria, sorted by the sorting criteria.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property used for sorting.</typeparam>
        /// <param name="filter">The filter predicate which specifies the conditions to include a feeding transaction.</param>
        /// <param name="sort">The criteria for sorting.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>A collection of feeding transactions sorted as specified and filtered by the given criteria.</returns>
        public virtual async Task<IEnumerable<IFeedingTransaction>> FindAsync<TSortProperty>(Expression<Func<IFeedingTransaction, bool>> filter,
                                                                                             Expression<Func<IFeedingTransaction, TSortProperty>> sort,
                                                                                             ListSortDirection sortDirection,
                                                                                             CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            Logger.LogInformation("Finding feeding transactions...");

            return await LivestockContext.FeedingTransactions
                                         .ConstrainedFind(filter, sort, sortDirection)
                                         .Select(feedingTransaction => Mapper.Map(feedingTransaction))
                                         .Select(feedingTransaction => Mapper.Map(feedingTransaction))
                                         .ToListAsync(cancellationToken)
                                         .ConfigureAwait(false);
        }

        /// <summary>
        /// Finds a paged collection of feeding transactions that match a certain criteria, sorted by the sorting criteria.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property used for sorting.</typeparam>
        /// <param name="filter">The filter predicate which specifies the conditions to include a feeding transaction.</param>
        /// <param name="sort">The criteria for sorting.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="pagingOptions">The options for pagination.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>A paged collection of feeding transactions sorted as specified and filtered by the given criteria.</returns>
        public virtual async Task<IPagedData<IFeedingTransaction>> FindAsync<TSortProperty>(Expression<Func<IFeedingTransaction, bool>> filter,
                                                                                            Expression<Func<IFeedingTransaction, TSortProperty>> sort,
                                                                                            ListSortDirection sortDirection,
                                                                                            IPagingOptions pagingOptions,
                                                                                            CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            Logger.LogInformation("Finding feeding transactions...");

            var data = await LivestockContext.FeedingTransactions
                                         .ConstrainedFind(filter, sort, sortDirection, pagingOptions)
                                         .Select(feedingTransaction => Mapper.Map(feedingTransaction))
                                         .Select(feedingTransaction => Mapper.Map(feedingTransaction))
                                         .ToListAsync(cancellationToken)
                                         .ConfigureAwait(false);

            var totalRecords = await LivestockContext.FeedingTransactions.CountAsync(filter).ConfigureAwait(false);

            return new PagedData<IFeedingTransaction>(data, pagingOptions.PageSize, pagingOptions.PageNumber, totalRecords);
        }

        /// <summary>
        /// Finds a paged collection of feeding transactions sorted by the sorting criteria.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property used for sorting.</typeparam>
        /// <param name="sort">The criteria for sorting.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="pagingOptions">The options for pagination.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>A paged collection of feeding transactions sorted as specified.</returns>
        public virtual async Task<IPagedData<IFeedingTransaction>> FindAsync<TSortProperty>(Expression<Func<IFeedingTransaction, TSortProperty>> sort,
                                                                                            ListSortDirection sortDirection,
                                                                                            IPagingOptions pagingOptions,
                                                                                            CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            Logger.LogInformation("Finding feeding transactions...");

            var data = await LivestockContext.FeedingTransactions
                                         .ConstrainedFind(_ => true, sort, sortDirection, pagingOptions)
                                         .Select(feedingTransaction => Mapper.Map(feedingTransaction))
                                         .Select(feedingTransaction => Mapper.Map(feedingTransaction))
                                         .ToListAsync(cancellationToken)
                                         .ConfigureAwait(false);

            var totalRecords = await LivestockContext.FeedingTransactions.CountAsync().ConfigureAwait(false);

            return new PagedData<IFeedingTransaction>(data, pagingOptions.PageSize, pagingOptions.PageNumber, totalRecords);
        }

        /// <summary>
        /// Finds a feed type with the given ID.
        /// </summary>
        /// <param name="key">The unique identifier value for the feeding transaction.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The matching feeding transaction if found.</returns>
        public virtual async Task<IFeedingTransaction?> GetOneAsync(long key, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Finding a feeding transaction that matches ID {key}...");
            var feedingTransaction = await LivestockContext.FeedingTransactions
                                                           .FindAsync(new object[] { key }, cancellationToken)
                                                           .ConfigureAwait(false);

            Logger.LogDebug($"Find feeding transaction with ID {key} result: {feedingTransaction}");
            return Mapper.Map(feedingTransaction);
        }

        /// <summary>
        /// Removes a feeding transaction with the given ID.
        /// </summary>
        /// <param name="key">The unique identifier value for the feeding transaction.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The ID of the removed feeding transaction.</returns>
        public virtual async Task<long> RemoveAsync(long key, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Deleting feeding transaction with ID {key}...");
            var feedingTransaction = await LivestockContext.FeedingTransactions
                                                           .FindAsync(new object[] { key }, cancellationToken)
                                                           .ConfigureAwait(false);
            if (feedingTransaction == null)
                throw new EntityNotFoundException<IFeedingTransaction>(key);

            var changes = LivestockContext.Remove(feedingTransaction);
            await LivestockContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
            Logger.LogDebug($"Deleted feeding transaction with ID {changes.Entity.Id}.");
            return changes.Entity.Id;
        }

        /// <summary>
        /// Updates a feeding transaction with the given values.
        /// </summary>
        /// <param name="item">The property values with which to update the feeding transaction.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The updated feeding transaction.</returns>
        public virtual async Task<IFeedingTransaction> UpdateAsync(IFeedingTransaction item, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Updating feeding transaction with ID {item.Id}...");
            var feedingTransaction = await LivestockContext.FeedingTransactions
                                                           .FindAsync(new object[] { item.Id }, cancellationToken)
                                                           .ConfigureAwait(false);
            if (feedingTransaction == null)
                throw new EntityNotFoundException<IFeedingTransaction>(item.Id);

            UpdateEntityValues(feedingTransaction, item);

            var changes = LivestockContext.Update(feedingTransaction);
            await LivestockContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

            return Mapper.Map(changes.Entity);
        }

        /// <summary>
        /// Updates the feeding transaction entity instance with the values of the feeding transaction DTO instance.
        /// </summary>
        /// <param name="entity">The database entity instance of the feeding transaction.</param>
        /// <param name="dto">The DTO instance of the feeding transaction.</param>
        protected virtual void UpdateEntityValues(FeedingTransactionModel entity, IFeedingTransaction dto)
        {
            entity.FeedTypeId = dto.FeedTypeId;
            entity.Quantity = dto.Quantity;
            entity.TransactionDate = dto.TransactionDate;
            entity.UnitId = dto.UnitId;
        }
    }
}
