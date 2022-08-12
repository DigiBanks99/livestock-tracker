namespace LivestockTracker.Medicine.ViewModels;

/// <summary>
///     A view of a medical transaction.
/// </summary>
/// <param name="Id">The transaction's unique identifier.</param>
/// <param name="AnimalId">The animal the medicine was administered to.</param>
/// <param name="MedicineId">The identifier of the administered medicine.</param>
/// <param name="TransactionDate">The date and time the medicine was administered.</param>
/// <param name="Dose">The decimal dosage of the medicine measured by <see cref="UnitId" />.</param>
/// <param name="UnitId">The identifier of the unit of measurement of the <see cref="Dose" />.</param>
public record MedicalTransactionViewModel(long Id,
    long AnimalId,
    int MedicineId,
    DateTimeOffset TransactionDate,
    decimal Dose,
    int UnitId)
{
    /// <summary>
    ///     The null instance of a transaction view model.
    /// </summary>
    public static MedicalTransactionViewModel Null { get; } = new(0, 0, 0, DateTimeOffset.MinValue, Decimal.Zero, 0);
}

internal static class MedicalTransactionViewModelExtensions
{
    internal static MedicalTransactionViewModel ToViewModel(this MedicalTransaction transaction)
    {
        return new(transaction.Id, transaction.AnimalId, transaction.MedicineId, transaction.TransactionDate,
            transaction.Dose, transaction.UnitId);
    }
}
