using LivestockTracker.Abstractions.Models;

namespace LivestockTracker.Abstractions.Services.Animal
{
    /// <summary>
    /// Provides create, read and update and deletion services for animals.
    /// </summary>
    public interface IAnimalCrudService : ICrudAsyncService<IAnimal, int>
    {
    }
}
