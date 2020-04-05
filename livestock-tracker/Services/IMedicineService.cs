using LivestockTracker.Abstractions;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public interface IMedicineService : IService<MedicineTypeModel, MedicineType, int>
    {
    }
}
