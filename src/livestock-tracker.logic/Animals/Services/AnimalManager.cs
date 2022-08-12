using LivestockTracker.Exceptions;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace LivestockTracker.Animals;

/// <summary>
///     Provides create, read, update and delete services for animals.
/// </summary>
internal sealed class AnimalManager : IAnimalManager
{
    private readonly LivestockContext _dbContext;

    private readonly ILogger _logger;

    /// <summary>
    ///     Constructor.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="dbContext">The database context that contains the animal entity.</param>
    public AnimalManager(ILogger<AnimalManager> logger, LivestockContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    /// <inheritdoc />
    public void ArchiveAnimals(int[] animalIds)
    {
        _logger.LogInformation("Archiving animals...");

        var animals = _dbContext.Animals
            .Where(animal => animalIds.Contains((int)animal.Id)
                             && !animal.Archived)
            .ToList();

        _logger.LogDebug("Archiving {@Count} unarchived animals...", animals.Count);
        foreach (Animal animal in animals)
        {
            animal.Archive();
        }

        _dbContext.SaveChanges();
    }

    /// <summary>
    ///     Removes the animal with an ID that matches the key value from the persisted store.
    /// </summary>
    /// <param name="id">The identifying value of the animal.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The ID of the animal that was removed.</returns>
    /// <exception cref="EntityNotFoundException{AnimalModel}">When the animal with the given key is not found.</exception>
    public async Task<long> RemoveAsync(long id, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Removing the animal with ID {AnimalId}...", id);

        Animal? entity = await _dbContext.Animals.FirstOrDefaultAsync(animal => animal.Id == id, cancellationToken)
            .ConfigureAwait(false);
        if (entity == null)
        {
            throw new EntityNotFoundException<Animal>(id);
        }

        EntityEntry<Animal> changes = _dbContext.Animals.Remove(entity);
        await _dbContext.SaveChangesAsync(cancellationToken)
            .ConfigureAwait(false);

        return changes.Entity.Id;
    }

    /// <inheritdoc />
    public void UnarchiveAnimals(int[] animalIds)
    {
        _logger.LogInformation("Unarchiving animals...");

        var animals = _dbContext.Animals
            .Where(animal => animalIds.Contains((int)animal.Id)
                             && animal.Archived)
            .ToList();

        _logger.LogDebug("Unarchiving {@Count} archived animals...", animals.Count);
        foreach (Animal animal in animals)
        {
            animal.Unarchive();
        }

        _dbContext.SaveChanges();
    }

    /// <inheritdoc />
    public Task<Animal?> GetOneAsync(long id, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Retrieving the information of animal with ID {AnimalId}", id);

        return _dbContext.Animals.AsNoTracking().FirstOrDefaultAsync(animal => animal.Id == id, cancellationToken);
    }

    /// <inheritdoc />
    public async Task<Animal> SellAnimalAsync(long id, DateTimeOffset sellDate, decimal sellPrice,
        CancellationToken cancellationToken)
    {
        _logger.LogInformation("Recording the sale of animal with id {AnimalId}", id);

        Animal? animal = await _dbContext.Animals.FirstOrDefaultAsync(animal => animal.Id == id, cancellationToken)
            .ConfigureAwait(false);
        if (animal == null)
        {
            throw new EntityNotFoundException<Animal>(id);
        }

        animal.Sell(sellPrice, sellDate);
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return animal;
    }

    /// <inheritdoc />
    public async Task<Animal> RecordAnimalDeathAsync(long id, DateTimeOffset dateOfDeath,
        CancellationToken cancellationToken)
    {
        _logger.LogInformation("Recording the death of animal with id {AnimalId}", id);

        Animal? animal = await _dbContext.Animals.FirstOrDefaultAsync(animal => animal.Id == id, cancellationToken)
            .ConfigureAwait(false);
        if (animal == null)
        {
            throw new EntityNotFoundException<Animal>(id);
        }

        animal.RecordDeath(dateOfDeath);
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return animal;
    }

    /// <summary>
    ///     Adds an animal to the persisted store.
    /// </summary>
    /// <param name="item">The animal to be added.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The added animal.</returns>
    public async Task<Animal> AddAsync(Animal item, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Adding an animal...");

        Animal entity = new(item.Type,
            item.Subspecies,
            item.Number,
            item.BatchNumber,
            item.BirthDate,
            item.PurchaseDate,
            item.PurchasePrice,
            item.ArrivalWeight);

        EntityEntry<Animal> changes = await _dbContext.AddAsync(entity, cancellationToken)
            .ConfigureAwait(false);
        await _dbContext.SaveChangesAsync(cancellationToken)
            .ConfigureAwait(false);

        return changes.Entity;
    }

    /// <summary>
    ///     Updates the properties of an animal in the persisted store.
    /// </summary>
    /// <param name="id">The unique identifier of the animal.</param>
    /// <param name="item">The animal with its desired values.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The updated animal.</returns>
    /// <exception cref="EntityNotFoundException{AnimalModel}">When the animal with the given key is not found.</exception>
    public async Task<Animal> UpdateAsync(long id, Animal item, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Updating the animal with ID {AnimalId}...", id);

        Animal? entity = await _dbContext.Animals.FirstOrDefaultAsync(animal => animal.Id == id, cancellationToken)
            .ConfigureAwait(false);
        if (entity == null)
        {
            throw new EntityNotFoundException<Animal>(id);
        }

        entity.Update(item);

        await _dbContext.SaveChangesAsync(cancellationToken)
            .ConfigureAwait(false);

        return entity;
    }
}
