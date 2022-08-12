using LivestockTracker.Pagination;

namespace LivestockTracker.Feed;

/// <summary>
///     Searches the data store for feed type information.
/// </summary>
public sealed class FeedTypeSearchService : IFeedTypeSearchService
{
    private readonly LivestockContext _dbContext;
    private readonly ILogger<FeedTypeSearchService> _logger;

    /// <summary>
    ///     Creates a new instance of <see cref="FeedTypeSearchService" /> with its core dependencies.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="dbContext">The database context.</param>
    public FeedTypeSearchService(ILogger<FeedTypeSearchService> logger, LivestockContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    /// <inheritdoc />
    public IPagedData<FeedType> Search(IQueryableFilter<FeedType> filter, IPagingOptions pagingOptions)
    {
        _logger.LogInformation("Searching for feed types using filter {@Filter}...", filter);

        return _dbContext.FeedTypes.AsNoTracking()
            .OrderBy(type => type.Description)
            .FilterOnObject(filter)
            .Paginate(pagingOptions);
    }

    /// <inheritdoc />
    public FeedType? GetOne(long id)
    {
        _logger.LogInformation("Retrieving feed type with ID = {Id}...", id);

        return _dbContext.FeedTypes.AsNoTracking()
            .FirstOrDefault(feedType => feedType.Id == id);
    }
}
