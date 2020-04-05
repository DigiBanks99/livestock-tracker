using LivestockTracker.Abstractions;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;

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
                TypeCode = right.TypeCode
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
                TypeCode = left.TypeCode
            };
        }
    }
}
