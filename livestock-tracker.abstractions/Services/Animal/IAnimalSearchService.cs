using LivestockTracker.Abstractions.Models;

namespace LivestockTracker.Abstractions.Services.Animal
{
    /// <summary>
    /// Provides fetching and pagination services for animals.
    /// </summary>
    /// <seealso cref="IFetchAsyncService{TData, TKey}"/>
    /// <seealso cref="IPagedFetchAsyncService{TData}"/>
    public interface IAnimalSearchService : IFetchAsyncService<IAnimalSummary, int>, IPagedFetchAsyncService<IAnimalSummary>
    {

    }
}
