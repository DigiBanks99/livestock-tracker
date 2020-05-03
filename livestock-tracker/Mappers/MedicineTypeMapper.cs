using LivestockTracker.Abstractions;
using LivestockTracker.Database.Models.Medical;
using LivestockTracker.Models.Medical;

namespace LivestockTracker.Mappers
{
    public class MedicineTypeMapper : IMapper<MedicineTypeModel, MedicineType>
    {
        public MedicineTypeModel Map(MedicineType? right)
        {
            if (right == null)
            {
                return new MedicineTypeModel();
            }

            return new MedicineTypeModel
            {
                Description = right.Description,
                Id = right.Id
            };
        }

        public MedicineType Map(MedicineTypeModel? left)
        {
            if (left == null)
            {
                return new MedicineType();
            }

            return new MedicineType
            {
                Description = left.Description,
                Id = left.Id
            };
        }
    }
}
