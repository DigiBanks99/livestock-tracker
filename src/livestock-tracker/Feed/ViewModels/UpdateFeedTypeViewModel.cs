namespace LivestockTracker.Feed.ViewModels;

public record UpdateFeedTypeViewModel(int Id, string Description)
{
    internal FeedType MapToFeedType()
    {
        return new FeedType
        {
            Id = Id,
            Description = Description,
            Deleted = false
        };
    }
}
