using LivestockTracker.Abstractions.Models.Animals;

namespace LivestockTracker.Abstractions.Services.Animals
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
