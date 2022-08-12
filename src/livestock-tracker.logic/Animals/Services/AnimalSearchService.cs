using LivestockTracker.Abstractions;
using LivestockTracker.Pagination;

namespace LivestockTracker.Animals;

/// <summary>
///     Provides search services for animals.
/// </summary>
public class AnimalSearchService : IAnimalSearchService
{
    private readonly LivestockContext _dbContext;
    private readonly ILogger _logger;

    /// <summary>
    ///     Constructor.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="dbContext">The database context that contains the animals.</param>
    public AnimalSearchService(ILogger<AnimalSearchService> logger, LivestockContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    /// <inheritdoc />
    public IPagedData<AnimalSummary> SearchPaged(IQueryableFilter<Animal> filter,
        IPagingOptions pagingOptions,
        OrderingOptions<AnimalOrderType>? orderingOptions = null)
    {
        _logger.LogInformation("Searching for {@PaginationOptions} animals with {@Filter}", pagingOptions, filter);

        return _dbContext.Animals
            .FilterOnObject(filter)
            .Order(orderingOptions)
            .SelectAnimalSummaries()
            .Paginate(pagingOptions);
    }
}
