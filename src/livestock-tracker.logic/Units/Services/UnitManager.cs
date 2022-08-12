using LivestockTracker.Exceptions;
using LivestockTracker.Feed;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace LivestockTracker.Units;

internal sealed class UnitManager : IUnitManager
{
    private readonly LivestockContext _dbContext;
    private readonly ILogger<UnitManager> _logger;

    public UnitManager(ILogger<UnitManager> logger, LivestockContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    public async Task<Unit> AddUnitAsync(Unit requestedUnit, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Adding a new unit with description '{Description}'...", requestedUnit.Description);

        Unit itemToAdd = new(requestedUnit.Description);

        EntityEntry<Unit> changes = await _dbContext.Units
            .AddAsync(itemToAdd, cancellationToken)
            .ConfigureAwait(false);

        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        _logger.LogDebug("Added a new unit: {@Unit}", changes.Entity);

        return changes.Entity;
    }

    public async Task<Unit> UpdateAsync(int id, Unit requestedValues, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Updating the unit with ID {Id}...", id);

        Unit? entity = await _dbContext.Units.FirstOrDefaultAsync(unit => unit.Id == id, cancellationToken);
        if (entity == null)
        {
            _logger.LogWarning("An attempt was made to update a non-existing unit {@Request}", requestedValues);
            throw new EntityNotFoundException<Unit>(requestedValues.Id);
        }

        entity.Update(requestedValues);
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return entity;
    }

    public async Task<int> RemoveAsync(int id, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Marking the unit with ID {Id} as deleted...", id);

        Unit entity = await _dbContext.Units.FirstOrDefaultAsync(unit => unit.Id == id, cancellationToken)
                      ?? throw new EntityNotFoundException<FeedType>(id);

        entity.Delete();
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        _logger.LogDebug("Unit with ID {Id} marked as deleted", id);
        return id;
    }
}
