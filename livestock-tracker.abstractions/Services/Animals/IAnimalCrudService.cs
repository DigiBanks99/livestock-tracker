using LivestockTracker.Abstractions.Models.Animals;

namespace LivestockTracker.Abstractions.Services.Animals
{
    /// <summary>
    /// Provides create, read and update and deletion services for animals.
    /// </summary>
    public interface IAnimalCrudService : ICrudAsyncService<IAnimal, long>, IFetchAsyncService<IAnimal, long>
    {
    }
}
