using LivestockTracker.Abstractions.Filters;
using LivestockTracker.Abstractions.Models;

namespace LivestockTracker.Medicine;

/// <summary>
///     / Provides fetch and pagination services for medicine types.
/// </summary>
public interface IMedicineTypeSearchService
{
    /// <summary>
    ///     Searches for medicines based on a given filter.
    /// </summary>
    /// <param name="filter">The filter implementation.</param>
    /// <param name="pagingOptions">The information for paging the result set.</param>
    /// <returns>An enumerated result of medicines that match the filter criteria.</returns>
    IPagedData<MedicineType> Search(IQueryableFilter<MedicineType> filter, IPagingOptions pagingOptions);

    /// <summary>
    ///     Finds a medicine that matches a given id.
    /// </summary>
    /// <param name="id">The medical transaction's ID.</param>
    /// <returns>
    ///     <list type="bullet">
    ///         <item>A medicine type if found.</item>
    ///         <item>Null if not found.</item>
    ///     </list>
    /// </returns>
    MedicineType? GetOne(long id);
}
