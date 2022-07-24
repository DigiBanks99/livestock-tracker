namespace LivestockTracker.Feed.ViewModels;

/// <summary>
///     Represents a feed type's values.
/// </summary>
/// <param name="Id">The feed type's unique identifier.</param>
/// <param name="Description">The friendly description of the feed type.</param>
/// <param name="IsDeleted">Whether the feed type is soft-deleted.</param>
public record FeedTypeViewModel(int Id, string Description, bool IsDeleted);

internal static class FeedTypeViewModelExtensions
{
    /// <summary>
    ///     Maps an instance of <see cref="FeedType" /> to an instance of <see cref="FeedTypeViewModel" />.
    /// </summary>
    /// <param name="feedType">The feed type to be mapped.</param>
    /// <returns>The mapped view model.</returns>
    internal static FeedTypeViewModel ToViewModel(this FeedType feedType)
    {
        return new FeedTypeViewModel(feedType.Id, feedType.Description, feedType.Deleted);
    }
}
