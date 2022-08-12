using LivestockTracker.Abstractions.Filters;
using LivestockTracker.Pagination;

namespace LivestockTracker.Units;

/// <summary>
///     Defines operations for retrieving <see cref="Unit" /> items.
/// </summary>
public interface IUnitSearchService
{
    /// <summary>
    ///     Retrieves some subset of <see cref="Unit" /> items that match the given filter and paged according to the
    ///     provided options.
    /// </summary>
    /// <param name="filter">Provides the filtering logic.</param>
    /// <param name="pagingOptions">Provides the parameters for returning the correct subset of data.</param>
    /// <param name="cancellationToken">A token that can be used to cancel long running tasks.</param>
    /// <returns>The subset of feed types that matches filter according to the pagination information.</returns>
    Task<IPagedData<Unit>> SearchAsync(IQueryableFilter<Unit> filter,
        IPagingOptions pagingOptions,
        CancellationToken cancellationToken);

    /// <summary>
    ///     Retrieves the unit that matches the given identifier or null otherwise.
    /// </summary>
    /// <param name="id">The unique identifier of the unit.</param>
    /// <param name="cancellationToken">A token that can be used to cancel long running tasks.</param>
    /// <returns>The unit with the given identifier or null.</returns>
    Task<Unit?> GetOneAsync(int id, CancellationToken cancellationToken);
}
