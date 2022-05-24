using System;
using System.Diagnostics;

namespace LivestockTracker.Medicine;

/// <summary>
/// A medical transaction for an animal.
/// </summary>
[DebuggerDisplay("{AnimalId} - {TransactionDate.ToString(\"s\")} - {Dose}")]
public class MedicalTransaction
{
    /// <summary>
    /// The unique identifier of the transactino.
    /// </summary>
    public long Id { get; set; }
    /// <summary>
    /// The animal the transaction belongs to.
    /// </summary>
    public long AnimalId { get; set; }
    /// <summary>
    /// The unique identifier of the medicine administered.
    /// </summary>
    public int MedicineId { get; set; }
    /// <summary>
    /// The date the medication was administered.
    /// </summary>
    public DateTimeOffset TransactionDate { get; set; }
    /// <summary>
    /// The dose of the medicine administered.
    /// </summary>
    public decimal Dose { get; set; }
    /// <summary>
    /// The identifier of the unit used to measure the administered medicine.
    /// </summary>
    public int UnitId { get; set; }
}
