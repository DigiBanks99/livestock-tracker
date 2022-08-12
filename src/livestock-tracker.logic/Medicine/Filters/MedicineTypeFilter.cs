using System.Linq;
using LivestockTracker.Abstractions.Filters;
using Microsoft.EntityFrameworkCore;

namespace LivestockTracker.Medicine;

/// <summary>
/// Uses Linq to filter an <see cref="IQueryable"/> of <see cref="MedicineType"/> items based on the given filter
/// criteria.
/// </summary>
/// <param name="Query">The string to match on descriptions.</param>
/// <param name="IncludeDeleted">Whether to include deleted items. The default is to exclude.</param>
public record MedicineTypeFilter(string? Query, bool IncludeDeleted) : IQueryableFilter<MedicineType>
{
    /// <summary>
    /// Ensures the deleted items are excluded unless otherwise requested and that descriptions are filtered according
    /// to the <see cref="Query"/> if it has a value.
    /// </summary>
    /// <param name="query">The <see cref="IQueryable"/> of <see cref="MedicineType"/> items to be filtered.</param>
    /// <returns>The modified <see cref="IQueryable"/> of <see cref="MedicineType"/> items.</returns>
    public IQueryable<MedicineType> Filter(IQueryable<MedicineType> query)
    {
        query = IncludeDeleted ? query : query.Where(medicine => !medicine.Deleted);
        return string.IsNullOrEmpty(Query)
            ? query
            : query.Where(medicine => EF.Functions.Like(medicine.Description, $"{Query}%"));
    }
}
