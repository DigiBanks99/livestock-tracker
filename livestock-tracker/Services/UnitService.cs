using LivestockTracker.Database;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public class UnitService : Service<Unit, int>, IUnitService
    {
        public UnitService(LivestockContext context) : base(context) { }
    }
}
