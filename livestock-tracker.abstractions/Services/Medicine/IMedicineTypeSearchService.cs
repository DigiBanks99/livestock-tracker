using LivestockTracker.Abstractions.Models.Medical;

namespace LivestockTracker.Abstractions.Services.Medicine
{
    /// <summary>
    /// / Provides fetch and pagination services for medicine types.
    /// </summary>
    public interface IMedicineTypeSearchService : IPagedFetchAsyncService<IMedicineType>, IFetchAsyncService<IMedicineType, int>
    {
    }
}
