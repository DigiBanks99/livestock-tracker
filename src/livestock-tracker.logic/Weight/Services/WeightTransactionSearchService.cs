using System.ComponentModel;
using LivestockTracker.Pagination;
using LivestockTracker.Sorting;

namespace LivestockTracker.Weight;

/// <summary>
///     Provides operations for searching for weight transactions.
/// </summary>
public class WeightTransactionSearchService : IWeightTransactionSearchService
{
    private readonly LivestockContext _dbContext;
    private readonly ILogger<WeightTransactionSearchService> _logger;

    /// <summary>
    ///     Creates a new instance of <see cref="WeightTransactionSearchService" />.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="dbContext">The database context.</param>
    public WeightTransactionSearchService(ILogger<WeightTransactionSearchService> logger, LivestockContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    /// <inheritdoc />
    public async Task<WeightTransaction?> GetSingleAsync(long id, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Retrieving the weight transaction with Id: {@Id}", id);

        return await _dbContext.WeightTransactions
            .AsNoTracking()
            .FirstOrDefaultAsync(transaction => transaction.Id == id, cancellationToken)
            .ConfigureAwait(false);
    }

    /// <inheritdoc />
    public Task<IPagedData<WeightTransaction>> FetchPagedAsync(IQueryableFilter<WeightTransaction> filter,
        IPagingOptions pagingOptions,
        ListSortDirection sortDirection,
        CancellationToken cancellationToken)
    {
        _logger.LogInformation(
            "Fetching paged weight transactions according to a filter. {@Filter}, {@PagingOptions}, {SortDirection}",
            filter,
            pagingOptions,
            sortDirection);

        return _dbContext.WeightTransactions.AsNoTracking()
            .FilterOnObject(filter)
            .SortByCriteria(t => t.TransactionDate, sortDirection)
            .PaginateAsync(pagingOptions, cancellationToken);
    }
}
