using LivestockTracker.Abstractions.Models.Feed;

namespace LivestockTracker.Abstractions.Services.Feed
{
    /// <summary>
    /// Provides fetch and pagination services for feed types.
    /// </summary>
    /// <seealso cref="IPagedFetchAsyncService{TData}"/>
    public interface IFeedTypeSearchService : IPagedFetchAsyncService<IFeedType>, IFetchAsyncService<IFeedType, int>
    {
    }
}
