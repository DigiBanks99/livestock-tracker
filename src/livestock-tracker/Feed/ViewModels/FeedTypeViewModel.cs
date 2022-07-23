namespace LivestockTracker.Feed.ViewModels;

public record FeedTypeViewModel(int Id, string Description, bool IsDeleted);

internal static class FeedTypeViewModelExtensions
{
    internal static FeedTypeViewModel ToFeedTypeViewModel(this FeedType medicineType)
    {
        return new FeedTypeViewModel(medicineType.Id, medicineType.Description, medicineType.Deleted);
    }
}
