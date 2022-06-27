using LivestockTracker.Abstractions;

namespace LivestockTracker.Medicine
{
    /// <summary>
    /// Provides mapping operations between a medicine type DTO and a medicine type Entity.
    /// </summary>
    public class MedicineTypeMapper : IMapper<IMedicineType, MedicineType>
    {
        /// <summary>
        /// Maps an instance of a medicine type DTO to an instance of a medicine type entity.
        /// </summary>
        /// <param name="right">The DTO instance of the medicine type.</param>
        /// <returns>The entity instance of the medicine type.</returns>
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
        /// Maps an instance of a medicine type entity to an instance of a medicine type DTO.
        /// </summary>
        /// <param name="left">The entity instance of the medicine type.</param>
        /// <returns>The DTO instance of the medicine type.</returns>
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
