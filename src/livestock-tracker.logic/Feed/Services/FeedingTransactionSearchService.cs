using LivestockTracker.Pagination;

namespace LivestockTracker.Feed;

/// <inheritdoc />
internal sealed class FeedingTransactionSearchService : IFeedingTransactionSearchService
{
    private readonly LivestockContext _dbContext;
    private readonly ILogger<FeedingTransactionSearchService> _logger;

    /// <summary>
    ///     Creates a new instance of <see cref="FeedingTransactionSearchService" /> with its core dependencies.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="dbContext">The database context.</param>
    public FeedingTransactionSearchService(ILogger<FeedingTransactionSearchService> logger, LivestockContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    /// <inheritdoc />
    public IPagedData<FeedingTransaction> Search(IQueryableFilter<FeedingTransaction> filter,
        IPagingOptions pagingOptions)
    {
        _logger.LogInformation(
            "Searching for feeding transactions for filter {@Filter} with pagination options, {@PagingOptions}", filter,
            pagingOptions);

        return _dbContext.FeedingTransactions
            .FilterOnObject(filter)
            .OrderByDescending(transaction => transaction.TransactionDate)
            .Paginate(pagingOptions);
    }

    /// <inheritdoc />
    public FeedingTransaction? GetOne(long id)
    {
        _logger.LogInformation("Retrieving the information on feeding transaction with Id {FeedingTransactionId}", id);

        return _dbContext.FeedingTransactions.FirstOrDefault(transaction => transaction.Id == id);
    }
}
