using LivestockTracker.Abstractions.Filters;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Database;
using LivestockTracker.Logic.Filters;
using LivestockTracker.Logic.Paging;
using LivestockTracker.Logic.Sorting;
using LivestockTracker.Medicine;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.ComponentModel;
using System.Linq;

namespace LivestockTracker.Logic.Services.Medical;

/// <summary>
/// Provides fetch and pagination services for medical transaction.
/// </summary>
public class MedicalTransactionSearchService : IMedicalTransactionSearchService
{
    /// <summary>
    /// Constructor.
    /// </summary>
    ///<param name="logger">The logger.</param>
    ///<param name="livestockContext">The context that contains medical transaction.</param>
    public MedicalTransactionSearchService(ILogger<MedicalTransactionSearchService> logger, LivestockContext livestockContext)
    {
        Logger = logger;
        LivestockContext = livestockContext;
    }

    /// <summary>
    /// The logger.
    /// </summary>
    protected ILogger Logger { get; }

    /// <summary>
    /// The context that contains medical transaction.
    /// </summary>
    protected LivestockContext LivestockContext { get; }

    /// <inheritdoc/>
    public virtual IPagedData<MedicalTransaction> Find(IQueryableFilter<MedicalTransaction> filter,
                                                       ListSortDirection sortDirection,
                                                       IPagingOptions pagingOptions)
    {
        Logger.LogInformation("Finding {@PageSize} medical transaction for page {@PageNumber}...", pagingOptions.PageSize, pagingOptions.PageNumber);

        return LivestockContext.MedicalTransactions
                               .AsNoTracking()
                               .SortByCriteria(t => t.TransactionDate, sortDirection)
                               .MapToMedicalTransactions()
                               .FilterOnObject(filter)
                               .Paginate(pagingOptions);
    }

    /// <summary>
    /// Finds a medical transaction that matches a given key.
    /// </summary>
    /// <param name="key">The medical transaction's ID.</param>
    /// <returns>
    ///     <list type="bullet">
    ///         <item>A medical transaction if found.</item>
    ///         <item>Null if not found.</item>
    ///     </list>
    /// </returns>
    public virtual MedicalTransaction? GetOne(long key)
    {
        Logger.LogInformation("Finding a medical transaction that matches ID {@TransactionId}...", key);
        MedicalTransaction? transaction = LivestockContext.MedicalTransactions
                                                          .AsNoTracking()
                                                          .MapToMedicalTransactions()
                                                          .FirstOrDefault(t => t.Id == key);
        if (transaction == null)
        {
            return null;
        }

        Logger.LogDebug("Found medical transaction of ID {@TransactionId} result: {@Transaction}", key, transaction);
        return transaction;
    }
}
