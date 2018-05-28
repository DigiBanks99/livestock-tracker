using LivestockTracker.Database;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public class UnitService : Service<Unit>, IUnitService
    {
        public UnitService(IUnitRepository unitRepository) : base(unitRepository) { }
    }
}
