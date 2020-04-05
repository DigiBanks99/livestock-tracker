using LivestockTracker.Abstractions;
using LivestockTracker.Database;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public class MedicineService : Service<MedicineTypeModel, MedicineType, int>, IMedicineService
    {
        public MedicineService(LivestockContext livestockContext, IMapper<MedicineTypeModel, MedicineType> mapper)
            : base(livestockContext, mapper) { }
    }
}
