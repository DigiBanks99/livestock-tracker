using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace LivestockTracker.Feed;

/// <inheritdoc />
internal sealed class FeedingTransactionManager : IFeedingTransactionManager
{
    private readonly LivestockContext _dbContext;
    private readonly ILogger<FeedingTransactionManager> _logger;

    /// <summary>
    ///     Creates a new instance of <see cref="FeedingTransactionManager" /> with its core dependencies.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="dbContext">The database context.</param>
    public FeedingTransactionManager(ILogger<FeedingTransactionManager> logger, LivestockContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    /// <inheritdoc />
    public async Task<FeedingTransaction> AddAsync(FeedingTransaction transaction, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Adding a new feeding transaction for {AnimalId}...", transaction.AnimalId);

        FeedingTransaction itemToAdd = new(transaction.AnimalId,
            transaction.FeedTypeId,
            transaction.Quantity,
            transaction.UnitId,
            transaction.TransactionDate);

        EntityEntry<FeedingTransaction> changes = await _dbContext.FeedingTransactions
            .AddAsync(itemToAdd, cancellationToken)
            .ConfigureAwait(false);

        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        _logger.LogDebug("Added a new feeding transaction for {AnimalId}: {@FeedingTransaction}",
            changes.Entity.AnimalId, changes.Entity);

        return changes.Entity;
    }

    /// <inheritdoc />
    /// <exception cref="EntityNotFoundException{T}">
    ///     If the feeding transaction with the given id is not found.
    /// </exception>
    public async Task<FeedingTransaction> UpdateAsync(long id,
        FeedingTransaction request,
        CancellationToken cancellationToken)
    {
        _logger.LogInformation("Updating the feeding transaction with Id {FeedingTransactionId}...", id);

        FeedingTransaction? transaction = await _dbContext.FeedingTransactions
            .FirstOrDefaultAsync(entity => entity.Id == id, cancellationToken)
            .ConfigureAwait(false);
        if (transaction == null)
        {
            _logger.LogWarning("Attempted to update a non-existing feeding transaction with ID {FeedingTransactionId}", id);
            throw new EntityNotFoundException<FeedingTransaction>(id);
        }

        transaction.Update(request);

        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        _logger.LogDebug("Feeding transaction with Id {FeedingTransactionId} updated", id);
        return transaction;
    }

    /// <inheritdoc />
    /// <exception cref="EntityNotFoundException{T}">
    ///     If the feeding transaction with the given id is not found.
    /// </exception>
    public async Task<long> RemoveAsync(long id, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Deleting the feeding transaction with Id {FeedingTransactionId}...", id);

        FeedingTransaction? transaction = await _dbContext.FeedingTransactions
            .FirstOrDefaultAsync(entity => entity.Id == id, cancellationToken)
            .ConfigureAwait(false);
        if (transaction == null)
        {
            throw new EntityNotFoundException<FeedingTransaction>(id);
        }

        _dbContext.FeedingTransactions.Remove(transaction);
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        _logger.LogDebug("Feeding transaction with Id {FeedingTransactionId} deleted", id);
        return id;
    }
}
