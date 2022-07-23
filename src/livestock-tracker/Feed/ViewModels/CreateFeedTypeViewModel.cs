namespace LivestockTracker.Feed.ViewModels;

public record CreateFeedTypeViewModel(string Description)
{
    internal FeedType ToFeedType()
    {
        return new FeedType
        {
            Description = Description
        };
    }
}
