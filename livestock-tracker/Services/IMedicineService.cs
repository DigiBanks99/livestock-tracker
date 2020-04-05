using LivestockTracker.Abstractions;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public interface IMedicineService : IService<MedicineType, int>
    {
    }
}
