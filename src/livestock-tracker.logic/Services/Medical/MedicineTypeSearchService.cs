using LivestockTracker.Abstractions.Models;
using LivestockTracker.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using LivestockTracker.Abstractions.Filters;
using LivestockTracker.Logic.Filters;
using LivestockTracker.Logic.Paging;

namespace LivestockTracker.Medicine;

/// <summary>
/// Provides fetch and pagination services for medicine types.
/// </summary>
public class MedicineTypeSearchService : IMedicineTypeSearchService
{
    private readonly ILogger _logger;
    private readonly LivestockContext _dbContext;

    /// <summary>
    /// Constructor.
    /// </summary>
    ///<param name="logger">The logger.</param>
    ///<param name="dbContext">The context that contains medicine types.</param>
    public MedicineTypeSearchService(ILogger<MedicineTypeSearchService> logger, LivestockContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    /// <inheritdoc/>
    public IPagedData<MedicineType> Search(IQueryableFilter<MedicineType> filter, IPagingOptions pagingOptions)
    {
        _logger.LogInformation("Searching for medicines using filter {@Filter}...", filter);

        return _dbContext.MedicineTypes.AsNoTracking()
            .MapToMedicineTypes()
            .FilterOnObject(filter)
            .Paginate(pagingOptions);
    }

    /// <inheritdoc/>
    public MedicineType? GetOne(long id)
    {
        _logger.LogInformation("Retrieving medicine {Id}...", id);

        return _dbContext.MedicineTypes.AsNoTracking()
            .MapToMedicineTypes()
            .FirstOrDefault(medicine => medicine.Id == id);
    }
}
