namespace LivestockTracker.Medicine;

/// <summary>
/// A view of a medicine.
/// </summary>
/// <param name="Id">The identifier of the medicine.</param>
/// <param name="Description">The medicine's description.</param>
/// <param name="Deleted">The activity state of the item.</param>
public record MedicineViewModel(int Id, string Description, bool Deleted = false);

internal static class MedicineViewModelExtensions
{
    internal static MedicineViewModel ToMedicineViewModel(this MedicineType medicineType)
    {
        return new(medicineType.Id, medicineType.Description, medicineType.Deleted);
    }
}
