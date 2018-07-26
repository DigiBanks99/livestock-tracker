using LivestockTracker.Models;
using System.Linq;

namespace LivestockTracker.Database
{
    public class UnitRepository : Repository<Unit>, IUnitRepository
    {
        public UnitRepository(LivestockContext dbContext) : base(dbContext) { }

        public override Unit Get(int id)
        {
            return DataTable.OrderBy(u => u.Description).FirstOrDefault(unit => unit.TypeCode == id);
        }
    }
}
