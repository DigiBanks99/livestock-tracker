namespace LivestockTracker.Medicine.ViewModels;

/// <summary>
///     Represents a request to create a medical transaction.
/// </summary>
/// <param name="AnimalId">The identifier of the animal the medication was administered to.</param>
/// <param name="MedicineId">The identifier of the medication that was administered.</param>
/// <param name="TransactionDate">The date the medicine was administered.</param>
/// <param name="Dose">The dose of medicine administered.</param>
/// <param name="UnitId">The identifier of the unit of measurement of the dose.</param>
public record CreateMedicalTransactionViewModel(long AnimalId,
    int MedicineId,
    DateTimeOffset TransactionDate,
    decimal Dose,
    int UnitId)
{
    internal MedicalTransaction ToMedicalTransaction()
    {
        return new(AnimalId, MedicineId, TransactionDate, Dose, UnitId);
    }
}
