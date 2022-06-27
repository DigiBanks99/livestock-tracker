
using LivestockTracker.Abstractions.Services;

namespace LivestockTracker.Medicine
{
    /// <summary>
    /// / Provides fetch and pagination services for medicine types.
    /// </summary>
    public interface IMedicineTypeSearchService : IPagedFetchAsyncService<IMedicineType>, IFetchAsyncService<IMedicineType, int>
    {
    }
}
