using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Models.Weight;
using System.ComponentModel;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Abstractions.Services.Weight
{
    /// <summary>
    /// Defines the service endpoints required to create, read, update and delete a
    /// <see cref="WeightTransaction"/>.
    /// </summary>
    public interface IWeightTransactionCrudService : ICrudAsyncService<WeightTransaction, long>
    {
        /// <summary>
        /// Fetches a list of <see cref="WeightTransaction"/> items based on the filter criteria,
        /// paged and sorted according to the parameters provided.
        /// </summary>
        /// <param name="filter">The details for filtering the results.</param>
        /// <param name="pagingOptions">The details for paging the results.</param>
        /// <param name="sortDirection">The direction to sort according to the dates.</param>
        /// <param name="cancellationToken">
        /// A token that can be used to cancel long running operations.
        /// </param>
        /// <returns>A paged collection of <see cref="WeightTransaction"/> items.</returns>
        Task<IPagedData<WeightTransaction>> FetchPagedAsync(WeightTransactionFilter filter,
                                                            IPagingOptions pagingOptions,
                                                            ListSortDirection sortDirection,
                                                            CancellationToken cancellationToken);

        /// <summary>
        /// Fetches a single <see cref="WeightTransaction"/> with the given identifier.
        /// </summary>
        /// <param name="id">The unique identifier for the transaction.</param>
        /// <param name="cancellationToken">
        /// A token that can be used to cancel long running operations.
        /// </param>
        /// <returns>The <see cref="WeightTransaction"/> that matches the identifier.</returns>
        Task<WeightTransaction> GetSingleAsync(long id, CancellationToken cancellationToken);
    }
}
