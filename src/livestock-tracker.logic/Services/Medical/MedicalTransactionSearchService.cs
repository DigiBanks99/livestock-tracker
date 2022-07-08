using System.ComponentModel;
using System.Linq;
using LivestockTracker.Abstractions.Filters;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Database;
using LivestockTracker.Logic.Filters;
using LivestockTracker.Logic.Paging;
using LivestockTracker.Logic.Sorting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace LivestockTracker.Medicine;

/// <summary>
///     Provides fetch and pagination services for medical transaction.
/// </summary>
public class MedicalTransactionSearchService : IMedicalTransactionSearchService
{
    private readonly LivestockContext _livestockContext;
    private readonly ILogger _logger;

    /// <summary>
    ///     Constructor.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="livestockContext">The context that contains medical transaction.</param>
    public MedicalTransactionSearchService(ILogger<MedicalTransactionSearchService> logger,
        LivestockContext livestockContext)
    {
        _logger = logger;
        _livestockContext = livestockContext;
    }

    /// <inheritdoc />
    public IPagedData<MedicalTransaction> Find(IQueryableFilter<MedicalTransaction> filter,
        ListSortDirection sortDirection,
        IPagingOptions pagingOptions)
    {
        _logger.LogInformation("Finding {PageSize} medical transaction for page {PageNumber}...",
            pagingOptions.PageSize, pagingOptions.PageNumber);

        return _livestockContext.MedicalTransactions
            //.AsNoTracking()
            .MapToMedicalTransactions()
            .FilterOnObject(filter)
            .SortByCriteria(t => t.TransactionDate, sortDirection)
            .Paginate(pagingOptions);
    }

    /// <summary>
    ///     Finds a medical transaction that matches a given key.
    /// </summary>
    /// <param name="key">The medical transaction's ID.</param>
    /// <returns>
    ///     <list type="bullet">
    ///         <item>A medical transaction if found.</item>
    ///         <item>Null if not found.</item>
    ///     </list>
    /// </returns>
    public MedicalTransaction? GetOne(long key)
    {
        _logger.LogInformation("Finding a medical transaction that matches ID {TransactionId}...", key);
        MedicalTransaction? transaction = _livestockContext.MedicalTransactions.AsNoTracking()
            .MapToMedicalTransactions()
            .FirstOrDefault(transaction => transaction.Id == key);

        if (transaction == null)
        {
            _logger.LogWarning("An attempt was made to access a medical transaction that doesn't exist");
            return null;
        }

        _logger.LogDebug("Found medical transaction of ID {TransactionId} result: {@Transaction}", key, transaction);
        return transaction;
    }
}
