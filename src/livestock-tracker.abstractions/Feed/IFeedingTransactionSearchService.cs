using LivestockTracker.Abstractions.Filters;
using LivestockTracker.Abstractions.Models;

namespace LivestockTracker.Feed;

/// <summary>
///     Provides various functions for searching for <see cref="FeedingTransaction" /> items.
/// </summary>
public interface IFeedingTransactionSearchService
{
    /// <summary>
    ///     Find a subset of <see cref="FeedingTransaction" /> items that match a filtered set of criteria, ordered by
    ///     <see cref="FeedingTransaction.TransactionDate" /> in descending order.
    /// </summary>
    /// <param name="filter">The filtering logic for the search.</param>
    /// <param name="pagingOptions">The pagination data for the result set.</param>
    /// <returns>The paged collection of feeding transactions.</returns>
    IPagedData<FeedingTransaction> Search(IQueryableFilter<FeedingTransaction> filter, IPagingOptions pagingOptions);

    /// <summary>
    ///     Finds the feeding transaction that matches the given id if the user has permission.
    ///     Throws an exception if it is not found.
    /// </summary>
    /// <param name="id">The unique identifier of the feeding transaction.</param>
    /// <returns>The feeding transaction if found. An exception otherwise.</returns>
    FeedingTransaction? GetOne(long id);
}
