using System.Collections.Generic;
using System.Diagnostics;
using LivestockTracker.Exceptions;

namespace LivestockTracker.Medicine;

/// <summary>
///     The type of medicines that can be administered to an animal.
/// </summary>
[DebuggerDisplay("{Description}{Deleted ? \" (Deleted)\" : string.Empty}")]
public class MedicineType
{
    /// <summary>
    ///     Creates a new instance of <see cref="MedicineType" />.
    /// </summary>
    /// <param name="description">The unique description of the medicine.</param>
    public MedicineType(string description)
    {
        Id = 0;
        Description = description;
        Deleted = false;
    }

    /// <summary>
    ///     The transactions for this medicine.
    /// </summary>
    public IList<MedicalTransaction> MedicalTransactions { get; } = new List<MedicalTransaction>();

    /// <summary>
    ///     The unique identifier of the medicine type.
    /// </summary>
    public int Id { get; }

    /// <summary>
    ///     The friendly name of the medicine type.
    /// </summary>
    public string Description { get; private set; }

    /// <summary>
    ///     Whether the medicine type is considered deleted and no longer available for selection.
    /// </summary>
    public bool Deleted { get; private set; }

    /// <summary>
    ///     Updates the medicine type with the given values.
    /// </summary>
    /// <param name="desiredValues">The desired values the medicine type should have.</param>
    /// <exception cref="DeletedItemNotUpdateableException">The item is deleted and cannot be updated.</exception>
    public void Update(MedicineType desiredValues)
    {
        if (Deleted)
        {
            throw new DeletedItemNotUpdateableException(
                "This medicine type is already deleted and cannot be modified.");
        }

        Description = desiredValues.Description;
    }

    /// <summary>
    ///     Marks the medicine type as deleted.
    /// </summary>
    public void Delete()
    {
        Deleted = true;
    }
}
