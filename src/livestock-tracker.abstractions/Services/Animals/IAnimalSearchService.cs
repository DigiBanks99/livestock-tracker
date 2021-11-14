using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Filters;
using LivestockTracker.Abstractions.Models;

namespace LivestockTracker.Animals
{
    /// <summary>
    /// Provides fetching and pagination services for animals.
    /// </summary>
    public interface IAnimalSearchService
    {
        /// <summary>
        /// Search for summarized animal records that match a certain set of criteria.<br/>
        /// The result set will be paginated according to the parameters provided.<br/>
        /// Optionally the list can be ordered too.
        /// </summary>
        /// <param name="filter">An object that will handle the filtering logic.</param>
        /// <param name="pagingOptions">Options for paging the result set.</param>
        /// <param name="orderingOptions">Options for sorting the result set.</param>
        /// <returns>
        /// A paginated set of <see cref="AnimalSummary"/> items that matches the filter criteria.<br/>
        /// If <paramref name="orderingOptions"/> were provided, the result set will first be ordered
        /// and then paginated.
        /// </returns>
        IPagedData<AnimalSummary> SearchPaged(IQueryableFilter<AnimalSummary> filter, IPagingOptions pagingOptions, OrderingOptions<AnimalOrderType>? orderingOptions = null);
    }
}
