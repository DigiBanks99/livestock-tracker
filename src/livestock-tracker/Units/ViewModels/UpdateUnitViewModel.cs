namespace LivestockTracker.Units.ViewModels;

/// <summary>
/// </summary>
/// <param name="Id"></param>
/// <param name="Description"></param>
public record UpdateUnitViewModel(int Id, string Description);

internal static class UpdateUnitViewModelExtensions
{
    public static Unit ToUnit(this UpdateUnitViewModel request)
    {
        return new Unit(request.Description);
    }
}
