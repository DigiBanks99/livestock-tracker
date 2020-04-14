using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Services;

namespace LivestockTracker.Logic.Services
{
    /// <summary>
    /// Provides fetching and pagination services.
    /// </summary>
    /// <seealso cref="IFetchAsyncService{TData, TKey}"/>
    /// <seealso cref="IPagedFetchAsyncService{TData}"/>
    public interface IAnimalSearchService : IFetchAsyncService<IAnimalSummary, int>, IPagedFetchAsyncService<IAnimalSummary>
    {

    }
}
