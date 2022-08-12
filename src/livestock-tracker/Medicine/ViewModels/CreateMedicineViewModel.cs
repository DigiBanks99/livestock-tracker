namespace LivestockTracker.Medicine;

/// <summary>
///     Represents a request to create a new medicine.
/// </summary>
/// <param name="Description">The description of the medicine.</param>
public record CreateMedicineViewModel(string Description)
{
    /// <summary>
    ///     Converts the request to the given domain model.
    /// </summary>
    /// <returns>An instance of <see cref="MedicineType" /> with the same description.</returns>
    internal MedicineType ToMedicineType()
    {
        return new(Description);
    }
}
