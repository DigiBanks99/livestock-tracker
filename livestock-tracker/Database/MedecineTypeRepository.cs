using LivestockTracker.Models;
using System.Linq;

namespace LivestockTracker.Database
{
    public class MedecineTypeRepository : Repository<MedecineType>, IMedecineTypeRepository
    {
        public MedecineTypeRepository(LivestockContext context) : base(context) { }

        public override MedecineType Get(int id)
        {
            return DataTable.FirstOrDefault(medecine => medecine.TypeCode == id);
        }
    }
}
