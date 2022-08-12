using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Feed;

/// <summary>
///     Defines the core operations for managing <see cref="FeedType" /> items.
/// </summary>
public interface IFeedTypeManager
{
    /// <summary>
    ///     Adds a new feed type to the persisted store.
    /// </summary>
    /// <param name="requestedFeedType">The desired state of the new feed type.</param>
    /// <param name="cancellationToken">A token that can be used to cancel long-running tasks.</param>
    /// <returns>The saved instance of the feed type.</returns>
    Task<FeedType> AddAsync(FeedType requestedFeedType, CancellationToken cancellationToken);

    /// <summary>
    ///     Updates a feed type with the desired values.
    /// </summary>
    /// <param name="id">The unique identifier of the feed type.</param>
    /// <param name="requestedValues">The desired values for the feed type.</param>
    /// <param name="cancellationToken">A token that can be used to cancel long-running tasks.</param>
    /// <returns>The updated feed type.</returns>
    Task<FeedType> UpdateAsync(int id, FeedType requestedValues, CancellationToken cancellationToken);

    /// <summary>
    ///     Marks a feed type as deleted. Does not actually delete the record.
    /// </summary>
    /// <param name="id">The unique identifier of the feed type.</param>
    /// <param name="cancellationToken">A token that can be used to cancel long-running tasks.</param>
    /// <returns>The unique identifier of the soft-deleted item.</returns>
    Task<int> RemoveAsync(int id, CancellationToken cancellationToken);
}
