using LivestockTracker.Exceptions;

namespace LivestockTracker.Animals;

/// <summary>
///     Provides create, read and update and deletion services for animals.
/// </summary>
public interface IAnimalManager
{
    /// <summary>
    ///     Adds an animal to the persisted store.
    /// </summary>
    /// <param name="request">The information of the animal to be added.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The added animal.</returns>
    Task<Animal> AddAsync(Animal request, CancellationToken cancellationToken);

    /// <summary>
    ///     Updates the properties of an animal in the persisted store.
    /// </summary>
    /// <param name="id">The unique identifier of the animal.</param>
    /// <param name="desiredValues">The desired values for the animal.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The updated animal.</returns>
    /// <exception cref="EntityNotFoundException{Animal}">When the animal with the given key is not found.</exception>
    Task<Animal> UpdateAsync(long id, Animal desiredValues, CancellationToken cancellationToken);

    /// <summary>
    ///     Removes the animal with an ID that matches the key value from the persisted store.
    /// </summary>
    /// <param name="id">The identifying value of the animal.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The ID of the animal that was removed.</returns>
    /// <exception cref="EntityNotFoundException{Animal}">When the animal with the given key is not found.</exception>
    Task<long> RemoveAsync(long id, CancellationToken cancellationToken);

    /// <summary>
    ///     Archives a collection of animals if they are not yet archived.
    /// </summary>
    /// <param name="animalIds">The collection of animals that are to be archived.</param>
    void ArchiveAnimals(int[] animalIds);

    /// <summary>
    ///     Removes a collection of animals from the archive if they are yet archived.
    /// </summary>
    /// <param name="animalIds">The collection of animals that are to be unarchived.</param>
    void UnarchiveAnimals(int[] animalIds);

    /// <summary>
    ///     Retrieves the full information of a single animal.
    /// </summary>
    /// <param name="id">The unique identifier of the animal.</param>
    /// <param name="cancellationToken">A token that can be used to cancel the fetch task.</param>
    /// <returns>The information for the animal.</returns>
    Task<Animal?> GetOneAsync(long id, CancellationToken cancellationToken);

    /// <summary>
    ///     Records the sale of an animal.
    /// </summary>
    /// <param name="id">The unique identifier of the animal.</param>
    /// <param name="sellDate">The date the animal was sold.</param>
    /// <param name="sellPrice">The amount the animal was sold for.</param>
    /// <param name="cancellationToken">A token that can be used to cancel the sell task.</param>
    /// <returns>A reference to the sold animal.</returns>
    Task<Animal> SellAnimalAsync(long id, DateTimeOffset sellDate, decimal sellPrice,
        CancellationToken cancellationToken);

    /// <summary>
    ///     Records the death of an animal.
    /// </summary>
    /// <param name="id">The unique identifier of the animal.</param>
    /// <param name="dateOfDeath">The date the animal died.</param>
    /// <param name="cancellationToken">A token that can be used to cancel the deceased animal recording task.</param>
    /// <returns>A reference to the deceased animal.</returns>
    Task<Animal> RecordAnimalDeathAsync(long id, DateTimeOffset dateOfDeath, CancellationToken cancellationToken);
}
