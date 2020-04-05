using LivestockTracker.Database;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public class MedicineService : Service<MedicineType, int>, IMedicineService
    {
        public MedicineService(LivestockContext livestockContext) : base(livestockContext) { }
    }
}
