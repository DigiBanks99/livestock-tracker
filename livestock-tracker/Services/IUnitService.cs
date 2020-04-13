using LivestockTracker.Abstractions.Services;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public interface IUnitService : IService<UnitModel, Unit, int>
    {
    }
}
