using LivestockTracker.Animals;

namespace LivestockTracker.Abstractions.Services.Animals
{
    /// <summary>
    /// Provides create, read and update and deletion services for animals.
    /// </summary>
    public interface IAnimalCrudService : ICrudAsyncService<IAnimal, long>, IFetchAsyncService<IAnimal, long>
    {
        /// <summary>
        /// Archives a collection of animals if they are not yet archived.
        /// </summary>
        /// <param name="animalIds">The collection of animals that are to be archived.</param>
        void ArchiveAnimals(int[] animalIds);

        /// <summary>
        /// Unarchives a collection of animals if they are yet archived.
        /// </summary>
        /// <param name="animalIds">The collection of animals that are to be unarchived.</param>
        void UnarchiveAnimals(int[] animalIds);
    }
}
