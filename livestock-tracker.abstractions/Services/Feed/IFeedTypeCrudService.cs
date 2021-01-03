using LivestockTracker.Abstractions.Models.Feed;

namespace LivestockTracker.Abstractions.Services.Feed
{
    /// <summary>
    /// Provides create, read and update and deletion services for feed types.
    /// </summary>
    public interface IFeedTypeCrudService : ICrudAsyncService<IFeedType, int>
    {
    }
}
