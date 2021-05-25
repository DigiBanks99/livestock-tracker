using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models.Medical;
using LivestockTracker.Database.Models.Medical;
using LivestockTracker.Models.Medical;

namespace LivestockTracker.Logic.Mappers.Medical
{
    /// <summary>
    /// Provides mapping operations between a medical transaction DTO and a medical transaction Entity.
    /// </summary>
    public class MedicalTransactionMapper : IMapper<IMedicalTransaction, MedicalTransaction>
    {
        /// <summary>
        /// Maps an instance of a medical transaction DTO to an instance of a medical transaction entity.
        /// </summary>
        /// <param name="right">The DTO instance of the medical transaction.</param>
        /// <returns>The entity instance of the medical transaction.</returns>
        public IMedicalTransaction Map(MedicalTransaction? right)
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

        /// <summary>
        /// Maps an instance of a medical transaction entity to an instance of a medical transaction DTO.
        /// </summary>
        /// <param name="left">The entity instance of the medical transaction.</param>
        /// <returns>The DTO instance of the medical transaction.</returns>
        public MedicalTransaction Map(IMedicalTransaction? left)
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
