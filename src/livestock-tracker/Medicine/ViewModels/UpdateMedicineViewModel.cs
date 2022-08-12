namespace LivestockTracker.Medicine;

/// <summary>
///     Represents a request to update a medicine with the given values.
/// </summary>
/// <param name="Id">The identifier of the medicine.</param>
/// <param name="Description">The desired description.</param>
public record UpdateMedicineViewModel(int Id, string Description)
{
    /// <summary>
    ///     Converts the request to the given domain model.
    /// </summary>
    /// <returns>An instance of <see cref="MedicineType" /> with the same Id, Description and activity state.</returns>
    internal MedicineType ToMedicineType()
    {
        return new(Description);
    }
}
