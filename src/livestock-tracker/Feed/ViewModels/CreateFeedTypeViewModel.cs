namespace LivestockTracker.Feed.ViewModels;

/// <summary>
/// A request to create a new feed type.
/// </summary>
/// <param name="Description">The desired description of the feed.</param>
public record CreateFeedTypeViewModel(string Description)
{
    /// <summary>
    /// Converts the request into an instance of <see cref="FeedType"/>.
    /// </summary>
    /// <returns>The converted instance of <see cref="FeedType"/>.</returns>
    internal FeedType ToFeedType()
    {
        return new(Description, false);
    }
}
