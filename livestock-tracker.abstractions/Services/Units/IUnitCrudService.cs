using LivestockTracker.Abstractions.Models;

namespace LivestockTracker.Abstractions.Services.Units
{
    /// <summary>
    /// Provides definitions for create, read, update, delete and paginated find services for units.
    /// </summary>
    public interface IUnitCrudService : ICrudAsyncService<IUnit, int>, IPagedFetchAsyncService<IUnit>
    {
    }
}
