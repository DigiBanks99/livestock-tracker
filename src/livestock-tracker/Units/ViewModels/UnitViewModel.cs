namespace LivestockTracker.Units.ViewModels;

/// <summary>
///     A view of a unit of measurement.
/// </summary>
/// <param name="Id">The unique identifier of the unit.</param>
/// <param name="Description">The friendly description of the unit.</param>
/// <param name="IsDeleted">A flag to indicate if this unit has been deleted.</param>
public record UnitViewModel(int Id, string Description, bool IsDeleted);

internal static class UnitViewModelExtensions
{
    public static UnitViewModel ToViewModel(this Unit unit)
    {
        return new UnitViewModel(unit.Id, unit.Description, unit.Deleted);
    }
}
