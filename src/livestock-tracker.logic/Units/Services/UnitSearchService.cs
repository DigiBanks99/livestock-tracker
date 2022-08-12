using LivestockTracker.Pagination;

namespace LivestockTracker.Units;

internal sealed class UnitSearchService : IUnitSearchService
{
    private readonly LivestockContext _dbContext;
    private readonly ILogger<UnitSearchService> _logger;

    public UnitSearchService(ILogger<UnitSearchService> logger, LivestockContext dbContext)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }

    public async Task<IPagedData<Unit>> SearchAsync(IQueryableFilter<Unit> filter,
        IPagingOptions pagingOptions,
        CancellationToken cancellationToken)
    {
        _logger.LogInformation("Searching for units with filter {@Filter} and pagination options {@PagingOptions}",
            filter, pagingOptions);

        return await _dbContext.Units.AsNoTracking()
            .FilterOnObject(filter)
            .OrderBy(unit => unit.Description)
            .PaginateAsync(pagingOptions, cancellationToken)
            .ConfigureAwait(false);
    }

    public Task<Unit?> GetOneAsync(int id, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Retrieving the information of the unit with Id {UnitId}", id);

        return _dbContext.Units.FirstOrDefaultAsync(transaction => transaction.Id == id, cancellationToken);
    }
}
