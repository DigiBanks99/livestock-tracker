using LivestockTracker.Abstractions.Services;
using LivestockTracker.Database.Models.Medical;
using LivestockTracker.Models.Medical;

namespace LivestockTracker.Services
{
    public interface IMedicineService : IService<MedicineTypeModel, MedicineType, int>
    {
    }
}
