using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models.Units;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;

namespace LivestockTracker.Logic.Mappers.Units
{
    /// <summary>
    /// Provides mapping operations between a Unit DTO and a Unit Entity.
    /// </summary>
    public class UnitMapper : IMapper<UnitModel, IUnit>
    {
        /// <summary>
        /// Maps an instance of a unit DTO to an instance of a unit entity.
        /// </summary>
        /// <param name="right">The DTO instance of the unit.</param>
        /// <returns>The entity instance of the unit.</returns>
        public UnitModel Map(IUnit? right)
        {
            if (right == null)
            {
                return new UnitModel();
            }

            return new UnitModel
            {
                Description = right.Description,
                Id = right.Id,
                Deleted = right.Deleted
            };
        }

        /// <summary>
        /// Maps an instance of a unit entity to an instance of a unit DTO.
        /// </summary>
        /// <param name="left">The entity instance of the unit.</param>
        /// <returns>The DTO instance of the unit.</returns>
        public IUnit Map(UnitModel? left)
        {
            if (left == null)
            {
                return new Unit();
            }

            return new Unit
            {
                Description = left.Description,
                Id = left.Id,
                Deleted = left.Deleted
            };
        }
    }
}
