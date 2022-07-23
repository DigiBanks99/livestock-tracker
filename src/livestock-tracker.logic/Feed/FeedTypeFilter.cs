namespace LivestockTracker.Feed;

/// <summary>
/// Provides the logic for filtering <see cref="FeedType"/> items based on the given properties.
/// </summary>
/// <param name="Query">The string the user entered when searching.</param>
/// <param name="IncludeDeleted">Whether or not to include soft-deleted feed types.</param>
public record FeedTypeFilter(string? Query, bool IncludeDeleted) : IQueryableFilter<FeedType>
{
    /// <inheritdoc />
    public IQueryable<FeedType> Filter(IQueryable<FeedType> query)
    {
        query = IncludeDeleted ? query : query.Where(feedType => !feedType.Deleted);
        return string.IsNullOrEmpty(Query)
            ? query
            : query.Where(feedType => EF.Functions.Like(feedType.Description, $"{Query}%"));
    }
}
