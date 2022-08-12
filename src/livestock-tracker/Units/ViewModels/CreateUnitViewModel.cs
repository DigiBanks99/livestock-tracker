namespace LivestockTracker.Units.ViewModels;

/// <summary>
/// </summary>
/// <param name="Description"></param>
public record CreateUnitViewModel(string Description);

internal static class CreateUnitViewModelExtensions
{
    public static Unit ToUnit(this CreateUnitViewModel request)
    {
        return new Unit(request.Description);
    }
}
