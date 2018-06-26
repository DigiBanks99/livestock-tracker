using LivestockTracker.Models;
using System.Linq;

namespace LivestockTracker.Database
{
    public class MedicineTypeRepository : Repository<MedicineType>, IMedicineTypeRepository
    {
        public MedicineTypeRepository(LivestockContext context) : base(context) { }

        public override MedicineType Get(int id)
        {
            return DataTable.OrderBy(m => m.Description).FirstOrDefault(medicine => medicine.TypeCode == id);
        }
    }
}
