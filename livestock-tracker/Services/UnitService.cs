using LivestockTracker.Abstractions;
using LivestockTracker.Database;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public class UnitService : Service<UnitModel, Unit, int>, IUnitService
    {
        public UnitService(LivestockContext context, IMapper<UnitModel, Unit> mapper)
            : base(context, mapper) { }
    }
}
