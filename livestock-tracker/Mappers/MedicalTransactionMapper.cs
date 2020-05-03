using LivestockTracker.Abstractions;
using LivestockTracker.Database.Models.Medical;
using LivestockTracker.Models.Medical;

namespace LivestockTracker.Mappers
{
    public class MedicalTransactionMapper : IMapper<MedicalTransactionModel, MedicalTransaction>
    {
        public MedicalTransactionModel Map(MedicalTransaction? right)
        {
            if (right == null)
            {
                return new MedicalTransactionModel();
            }

            return new MedicalTransactionModel
            {
                AnimalId = right.AnimalId,
                Id = right.Id,
                Dose = right.Dose,
                MedicineId = right.MedicineId,
                TransactionDate = right.TransactionDate,
                UnitId = right.UnitId
            };
        }

        public MedicalTransaction Map(MedicalTransactionModel? left)
        {
            if (left == null)
            {
                return new MedicalTransaction();
            }

            return new MedicalTransaction
            {
                AnimalId = left.AnimalId,
                Id = left.Id,
                Dose = left.Dose,
                MedicineId = left.MedicineId,
                TransactionDate = left.TransactionDate,
                UnitId = left.UnitId
            };

        }
    }
}
