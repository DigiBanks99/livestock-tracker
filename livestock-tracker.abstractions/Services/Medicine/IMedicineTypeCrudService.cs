using LivestockTracker.Abstractions.Models.Medical;

namespace LivestockTracker.Abstractions.Services.Medicine
{
    /// <summary>
    /// Provides create, read and update and deletion services for medicine types.
    /// </summary>
    public interface IMedicineTypeCrudService : ICrudAsyncService<IMedicineType, int>
    {
    }
}
