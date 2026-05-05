using LivestockTracker.Abstractions.Filters;
using LivestockTracker.Pagination;

namespace LivestockTracker.Feed;

/// <summary>
///     Defines the operations for searching for and retrieving <see cref="FeedType" /> items.
/// </summary>
public interface IFeedTypeSearchService
{
    /// <summary>
    ///     Find <see cref="FeedType" /> instances that match the values of the given filter.
    /// </summary>
    /// <param name="filter">Provides the filtering logic.</param>
    /// <param name="pagingOptions">Provides the parameters for returning the correct subset of data.</param>
    /// <param name="cancellationToken">A token that can be used to cancel the fetch task.</param>
    /// <returns>The subset of feed types that matches filter according to the pagination information.</returns>
    Task<IPagedData<FeedType>> SearchAsync(IQueryableFilter<FeedType> filter,
        IPagingOptions pagingOptions,
        CancellationToken cancellationToken);

    /// <summary>
    ///     Returns the detail of a feed type that matches the given unique identifier.
    /// </summary>
    /// <param name="id">The feed type's unique identifier.</param>
    /// <returns>The feed type if found.</returns>
    FeedType? GetOne(long id);
}
