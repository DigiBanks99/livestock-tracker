using LivestockTracker.Database;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public class MedicineService : Service<MedicineType>, IMedicineService
    {
        public MedicineService(IMedicineTypeRepository medicineTypeRepository) : base(medicineTypeRepository) { }
    }
}
