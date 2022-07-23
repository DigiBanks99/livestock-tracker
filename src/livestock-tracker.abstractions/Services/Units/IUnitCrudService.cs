using LivestockTracker.Units;

namespace LivestockTracker.Abstractions.Services.Units;

/// <summary>
///     Provides definitions for create, read, update, delete and paginated find services for units.
/// </summary>
public interface IUnitCrudService : ICrudAsyncService<IUnit, int>, IPagedFetchAsyncService<IUnit>,
    IFetchAsyncService<IUnit, int>
{
}
