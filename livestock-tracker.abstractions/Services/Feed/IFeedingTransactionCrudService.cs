using LivestockTracker.Abstractions.Models.Feed;

namespace LivestockTracker.Abstractions.Services.Feed
{
    /// <summary>
    /// Provides create, read and update and deletion services for feeding transactions.
    /// Also provides paged record retrieval services.
    /// </summary>
    public interface IFeedingTransactionCrudService : ICrudAsyncService<IFeedingTransaction, int>, IPagedFetchAsyncService<IFeedingTransaction>
    {
    }
}
