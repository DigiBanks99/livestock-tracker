using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Models.Medical;
using LivestockTracker.Abstractions.Services.Medical;
using LivestockTracker.Database;
using LivestockTracker.Logic.Utilities;
using LivestockTracker.Medicine;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Logic.Services.Medical;

/// <summary>
/// Provides fetch and pagination services for medicine types.
/// </summary>
public class MedicineTypeSearchService : IMedicineTypeSearchService
{
    /// <summary>
    /// Constructor.
    /// </summary>
    ///<param name="logger">The logger.</param>
    ///<param name="mapper">The mapper.</param>
    ///<param name="livestockContext">The context that contains medicine types.</param>
    public MedicineTypeSearchService(ILogger<MedicineTypeSearchService> logger, IMapper<IMedicineType, MedicineType> mapper, LivestockContext livestockContext)
    {
        Logger = logger;
        Mapper = mapper;
        LivestockContext = livestockContext;
    }

    /// <summary>
    /// The logger.
    /// </summary>
    protected ILogger Logger { get; }

    /// <summary>
    /// The mapper.
    /// </summary>
    protected IMapper<IMedicineType, MedicineType> Mapper { get; }

    /// <summary>
    /// The context that contains medicine types.
    /// </summary>
    protected LivestockContext LivestockContext { get; }

    /// <summary>
    /// Finds the medicine types that match the filter condition sorted as specified.
    /// </summary>
    /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
    /// <param name="filter">The condition that filters the medicine types that need to be included.</param>
    /// <param name="sort">The condition that defines the sorting property.</param>
    /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
    /// <param name="pagingOptions">The options for pagination.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The sorted list of medicine types that match the filter.</returns>
    public virtual async Task<IPagedData<IMedicineType>> FindAsync<TSortProperty>(Expression<Func<IMedicineType, bool>> filter,
                                                                                  Expression<Func<IMedicineType, TSortProperty>> sort,
                                                                                  ListSortDirection sortDirection,
                                                                                  IPagingOptions pagingOptions,
                                                                                  CancellationToken cancellationToken)
        where TSortProperty : IComparable
    {
        Logger.LogInformation($"Finding {pagingOptions.PageSize} medicine types for page {pagingOptions.PageNumber}...");
        var paginatedResults = await PaginationUtility.FindAsync(LivestockContext.MedicineTypes,
                                                                 Mapper,
                                                                 filter,
                                                                 sort,
                                                                 sortDirection,
                                                                 pagingOptions,
                                                                 cancellationToken)
                                                      .ConfigureAwait(false);
        Logger.LogDebug($"Found paged medicine types: {paginatedResults}");
        return paginatedResults;
    }

    /// <summary>
    /// Finds the medicine types sorted as specified.
    /// </summary>
    /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
    /// <param name="sort">The condition that defines the sorting property.</param>
    /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
    /// <param name="pagingOptions">The options for pagination.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The sorted list of medicine types.</returns>
    public virtual Task<IPagedData<IMedicineType>> FindAsync<TSortProperty>(Expression<Func<IMedicineType, TSortProperty>> sort,
                                                                            ListSortDirection sortDirection,
                                                                            IPagingOptions pagingOptions,
                                                                            CancellationToken cancellationToken)
        where TSortProperty : IComparable
    {
        return FindAsync(_ => true, sort, sortDirection, pagingOptions, cancellationToken);
    }

    /// <summary>
    /// Finds the medicine types that match the filter condition sorted as specified.
    /// </summary>
    /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
    /// <param name="filter">The condition that filters the medicine types that need to be included.</param>
    /// <param name="sort">The condition that defines the sorting property.</param>
    /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The sorted list of medicine that match the filter.</returns>
    public virtual async Task<IEnumerable<IMedicineType>> FindAsync<TSortProperty>(Expression<Func<IMedicineType, bool>> filter,
                                                                                   Expression<Func<IMedicineType, TSortProperty>> sort,
                                                                                   ListSortDirection sortDirection,
                                                                                   CancellationToken cancellationToken)
        where TSortProperty : IComparable
    {
        Logger.LogInformation($"Finding medicine types...");
        return await LivestockContext.MedicineTypes
                                     .ConstrainedFind(filter, sort, sortDirection)
                                     .Where(medicineType => !medicineType.Deleted)
                                     .Select(medicineType => Mapper.Map(medicineType))
                                     .ToListAsync(cancellationToken)
                                     .ConfigureAwait(false);
    }

    /// <summary>
    /// Finds a medicine type that matches a given key.
    /// </summary>
    /// <param name="key">The medicine type's ID.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>
    ///     <list type="bullet">
    ///         <item>A medicine type if found.</item>
    ///         <item>Null if not found.</item>
    ///     </list>
    /// </returns>
    public virtual async Task<IMedicineType?> GetOneAsync(int key, CancellationToken cancellationToken)
    {
        Logger.LogInformation($"Finding a medicine type that matches ID {key}...");
        var medicineType = await LivestockContext.MedicineTypes
                                                 .FindAsync(new object[] { key }, cancellationToken)
                                                 .ConfigureAwait(false);

        Logger.LogDebug($"Find medicine type of ID {key} result: {medicineType}");
        return Mapper.Map(medicineType);
    }
}
