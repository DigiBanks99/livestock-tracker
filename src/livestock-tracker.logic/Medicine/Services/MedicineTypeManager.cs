using LivestockTracker.Exceptions;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace LivestockTracker.Medicine;

/// <summary>
///     Provides create, read, update and delete operations for medicine types.
/// </summary>
internal class MedicineTypeManager : IMedicineTypeManager
{
    private readonly LivestockContext _dbContext;
    private readonly ILogger _logger;

    /// <summary>
    ///     Constructor.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="dbContext">The database context that contains the medicine types.</param>
    public MedicineTypeManager(ILogger<MedicineTypeManager> logger, LivestockContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    /// <summary>
    ///     Attempts to add a new medicine type to the persisted store.
    /// </summary>
    /// <param name="item">The medicine type that should be added.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The added medicine type.</returns>
    public async Task<MedicineType> AddAsync(MedicineType item, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Adding a medicine type...");

        MedicineType entity = new(item.Description);

        if (_dbContext.MedicineTypes.Any(medicine => medicine.Id == item.Id))
        {
            throw new ItemAlreadyExistsException<int>(item.Id, "A Medicine");
        }

        EntityEntry<MedicineType> changes = await _dbContext.AddAsync(entity, cancellationToken).ConfigureAwait(false);
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        _logger.LogDebug("Medicine type '{Description}' added with detail", changes.Entity.Description);
        return changes.Entity;
    }

    /// <inheritdoc />
    public async Task<int> RemoveAsync(int id, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Marking the medicine type with ID {Id} as deleted...", id);

        MedicineType entity = _dbContext.MedicineTypes.FirstOrDefault(medicine => medicine.Id == id) ??
                              throw new EntityNotFoundException<MedicineType>(id);

        entity.Delete();
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        _logger.LogDebug("Medicine type with ID {Id} marked as deleted...", id);
        return id;
    }

    /// <inheritdoc />
    /// <exception cref="EntityNotFoundException{IMedicineType}">When the medicine type with the given key is not found.</exception>
    public async Task<MedicineType> UpdateAsync(int id, MedicineType item, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Updating the medicine type with ID {Id}...", id);

        MedicineType? entity = await _dbContext.MedicineTypes
            .FirstOrDefaultAsync(medicine => medicine.Id == id, cancellationToken)
            .ConfigureAwait(false);
        if (entity == null)
        {
            _logger.LogWarning("An attempt was made to update a non-existing medicine {@Request}", item);
            throw new EntityNotFoundException<MedicineType>(id);
        }

        entity.Update(item);
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return entity;
    }
}
