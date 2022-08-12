using System.Diagnostics;
using LivestockTracker.Animals;

namespace LivestockTracker.Medicine;

/// <summary>
///     A medical transaction for an animal.
/// </summary>
[DebuggerDisplay("{AnimalId} - {TransactionDate.ToString(\"s\")} - {Dose}")]
public class MedicalTransaction : IAnimalTransaction
{
    /// <summary>
    ///     Creates a new instance of a medical transaction.
    /// </summary>
    /// <param name="animalId">The animal to whom the medicine was administered.</param>
    /// <param name="medicineId">The unique identifier of the medicine that was administered.</param>
    /// <param name="transactionDate">The date of the medicine administration.</param>
    /// <param name="dose">The dosage of the medicine that was administered.</param>
    /// <param name="unitId">The unique identifier of the unit of measurement for the dosage.</param>
    public MedicalTransaction(long animalId, int medicineId, DateTimeOffset transactionDate, decimal dose, int unitId)
    {
        AnimalId = animalId;
        MedicineId = medicineId;
        TransactionDate = transactionDate;
        Dose = dose;
        UnitId = unitId;
    }

    /// <summary>
    ///     The unique identifier of the transaction.
    /// </summary>
    public long Id { get; private set; }

    /// <summary>
    ///     The unique identifier of the medicine administered.
    /// </summary>
    public int MedicineId { get; private set; }

    /// <summary>
    ///     The dose of the medicine administered.
    /// </summary>
    public decimal Dose { get; private set; }

    /// <summary>
    ///     The identifier of the unit used to measure the administered medicine.
    /// </summary>
    public int UnitId { get; private set; }

    /// <summary>
    ///     The unit in which <see cref="Dose" /> is measured.
    /// </summary>
    public Unit? UnitOfMeasurement { get; private set; }

    /// <summary>
    ///     The type of medicine that was administered.
    /// </summary>
    public MedicineType? Medicine { get; private set; }

    /// <summary>
    ///     The animal the transaction belongs to.
    /// </summary>
    public long AnimalId { get; }

    /// <summary>
    ///     The date the medication was administered.
    /// </summary>
    public DateTimeOffset TransactionDate { get; private set; }

    /// <summary>
    ///     The animal for which the medical transaction was captured.
    /// </summary>
    public Animal? Animal { get; private set; }

    /// <summary>
    ///     Updates the current medical transaction with the desired values.
    /// </summary>
    /// <param name="desiredValues">The values this medical transaction should have.</param>
    /// <exception cref="ArgumentException">
    ///     The animal in the updated transaction does not match the original transaction's animal.
    /// </exception>
    public void Update(MedicalTransaction desiredValues)
    {
        if (AnimalId != desiredValues.AnimalId)
        {
            throw new ArgumentException(
                "A transaction cannot be moved to a different animal. Capture a new transaction for that animal and delete this one.");
        }

        MedicineId = desiredValues.MedicineId;
        Dose = desiredValues.Dose;
        TransactionDate = desiredValues.TransactionDate;
        UnitId = desiredValues.UnitId;
    }
}
