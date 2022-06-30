namespace LivestockTracker.Medicine;

/// <summary>
/// Represents a request to update a medicine with the given values.
/// </summary>
/// <param name="Id">The identifier of the medicine.</param>
/// <param name="Description">The desired description.</param>
/// <param name="Deleted">The desired activity state of the item.</param>
public record UpdateMedicineViewModel(int Id, string Description, bool Deleted = false)
{
    /// <summary>
    /// Converts the request to the given domain model.
    /// </summary>
    /// <returns>An instance of <see cref="MedicineType"/> with the same Id, Description and activity state.</returns>
    internal MedicineType ToMedicineType()
    {
        return new()
        {
            Id = this.Id,
            Description = this.Description,
            Deleted = this.Deleted
        };
    }
}
