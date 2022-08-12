using LivestockTracker.Exceptions;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace LivestockTracker.Weight;

/// <summary>
///     Implements the service endpoints required to create, read, update and delete a
///     <see cref="WeightTransaction" />.
/// </summary>
public class WeightTransactionManager : IWeightTransactionManager
{
    private readonly LivestockContext _dbContext;
    private readonly ILogger _logger;

    /// <summary>
    ///     The constructor.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="dbContext">The context that contains the <see cref="WeightTransaction" /> items.</param>
    public WeightTransactionManager(ILogger<WeightTransactionManager> logger, LivestockContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    /// <inheritdoc />
    public async Task<WeightTransaction> AddAsync(WeightTransaction item, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Adding a new weight transaction for animal ({AnimalId})", item.AnimalId);

        ValidateAddAsyncParameters(item);

        WeightTransaction transaction = new(item.AnimalId, item.Weight, item.TransactionDate);

        EntityEntry<WeightTransaction> changes = _dbContext.WeightTransactions.Add(transaction);

        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return changes.Entity;
    }

    /// <inheritdoc />
    public async Task<WeightTransaction> UpdateAsync(long id, WeightTransaction desiredValues,
        CancellationToken cancellationToken)
    {
        _logger.LogInformation("Updating the weight transaction ({WeightTransactionId}) for animal ({AnimalId})", id,
            desiredValues.AnimalId);

        WeightTransaction? transaction = await _dbContext.WeightTransactions
            .FirstOrDefaultAsync(weight => weight.Id == id, cancellationToken)
            .ConfigureAwait(false);
        if (transaction == null)
        {
            throw new EntityNotFoundException<WeightTransaction>(id);
        }

        transaction.Update(desiredValues);

        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return transaction;
    }

    /// <inheritdoc />
    public async Task<long> RemoveAsync(long id, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Removing the weight transaction ({WeightTransactionId})", id);

        WeightTransaction? transaction = await _dbContext.WeightTransactions
            .FirstOrDefaultAsync(weight => weight.Id == id, cancellationToken)
            .ConfigureAwait(false);
        if (transaction == null)
        {
            throw new EntityNotFoundException<WeightTransaction>(id);
        }

        _dbContext.Remove(transaction);
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        return id;
    }

    private void ValidateAddAsyncParameters(WeightTransaction item)
    {
        if (!_dbContext.Animals.Any(animal => animal.Id == item.AnimalId))
        {
            throw new TransactionRequiresAnimalException(item.AnimalId);
        }
    }
}
