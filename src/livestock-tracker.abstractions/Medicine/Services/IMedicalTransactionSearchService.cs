using System.ComponentModel;
using LivestockTracker.Abstractions.Filters;
using LivestockTracker.Pagination;

namespace LivestockTracker.Medicine;

/// <summary>
///     / Provides fetch and pagination services for medical transactions.
/// </summary>
public interface IMedicalTransactionSearchService
{
    /// <summary>
    ///     Retrieves a paged collection of Medical Transactions that match a specified search query, sorted as requested.
    /// </summary>
    /// <param name="filter">The expression that must be true for an item to be included.</param>
    /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
    /// <param name="pagingOptions">The options for pagination.</param>
    /// <returns>A paged collection of items.</returns>
    IPagedData<MedicalTransaction> Find(IQueryableFilter<MedicalTransaction> filter,
        ListSortDirection sortDirection,
        IPagingOptions pagingOptions);

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
    MedicalTransaction? GetOne(long key);
}
