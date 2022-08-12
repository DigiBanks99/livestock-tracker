namespace LivestockTracker.Feed.ViewModels;

/// <summary>
///     A request to update a feed type with the desired values.
/// </summary>
/// <param name="Id">The unique identifier of the feed type that should be updated.</param>
/// <param name="Description">The desired description.</param>
public record UpdateFeedTypeViewModel(int Id, string Description)
{
    /// <summary>
    ///     Map the request to an instance of <see cref="FeedType" />.
    /// </summary>
    /// <returns>The mapped instance of <see cref="FeedType" />.</returns>
    internal FeedType ToFeedType()
    {
        return new(Description);
    }
}
