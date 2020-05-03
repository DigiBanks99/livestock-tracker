using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models.Medical;
using LivestockTracker.Database.Models.Medical;
using LivestockTracker.Models.Medical;

namespace LivestockTracker.Logic.Mappers.Medical
{
    /// <summary>
    /// Provides mapping operations between a medicine type DTO and a medicine type Entity.
    /// </summary>
    public class MedicineTypeMapper : IMapper<IMedicineType, MedicineType>
    {
        /// <summary>
        /// Maps an instance of a medicine DTO to an instance of a medicine entity.
        /// </summary>
        /// <param name="right">The DTO instance of the medicine.</param>
        /// <returns>The entity instance of the medicine.</returns>
        public IMedicineType Map(MedicineType? right)
        {
            if (right == null)
            {
                return new MedicineTypeModel();
            }

            return new MedicineTypeModel
            {
                Description = right.Description,
                Id = right.Id,
                Deleted = right.Deleted
            };
        }

        /// <summary>
        /// Maps an instance of a medicine entity to an instance of a medicine DTO.
        /// </summary>
        /// <param name="left">The entity instance of the medicine.</param>
        /// <returns>The DTO instance of the medicine.</returns>
        public MedicineType Map(IMedicineType? left)
        {
            if (left == null)
            {
                return new MedicineType();
            }

            return new MedicineType
            {
                Description = left.Description,
                Id = left.Id,
                Deleted = left.Deleted
            };
        }
    }
}
