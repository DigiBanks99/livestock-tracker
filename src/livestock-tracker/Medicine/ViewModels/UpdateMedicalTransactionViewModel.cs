namespace LivestockTracker.Medicine.ViewModels;

/// <summary>
///     The desired values that a transaction should have.
/// </summary>
/// <param name="Id">The unique identifier of the transaction.</param>
/// <param name="AnimalId">The animal the medicine was administered to.</param>
/// <param name="MedicineId">The identifier of the administered medicine.</param>
/// <param name="Dose">The decimal dosage of the medicine measured by <see cref="UnitId" />.</param>
/// <param name="UnitId">The identifier of the unit of measurement of the <see cref="Dose" />.</param>
/// <param name="TransactionDate">The date and time the medicine was administered.</param>
public record UpdateMedicalTransactionViewModel(long Id,
    long AnimalId,
    int MedicineId,
    decimal Dose,
    int UnitId,
    DateTimeOffset TransactionDate)
{
    internal MedicalTransaction ToMedicalTransaction()
    {
        return new(AnimalId, MedicineId, TransactionDate, Dose, UnitId);
    }
}
