using LivestockTracker.Abstractions;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;

namespace LivestockTracker.Mappers
{
    public class UnitMapper : IMapper<UnitModel, Unit>
    {
        public UnitModel Map(Unit? right)
        {
            if (right == null)
            {
                return new UnitModel();
            }

            return new UnitModel
            {
                Description = right.Description,
                Id = right.Id
            };
        }

        public Unit Map(UnitModel? left)
        {
            if (left == null)
            {
                return new Unit();
            }

            return new Unit
            {
                Description = left.Description,
                Id = left.Id
            };
        }
    }
}
