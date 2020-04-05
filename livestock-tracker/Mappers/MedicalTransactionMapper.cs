using LivestockTracker.Abstractions;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;

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
                AnimalID = right.AnimalID,
                ID = right.ID,
                Dose = right.Dose,
                MedicineTypeCode = right.MedicineTypeCode,
                TransactionDate = right.TransactionDate,
                Unit = right.Unit
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
                AnimalID = left.AnimalID,
                ID = left.ID,
                Dose = left.Dose,
                MedicineTypeCode = left.MedicineTypeCode,
                TransactionDate = left.TransactionDate,
                Unit = left.Unit
            };

        }
    }
}
