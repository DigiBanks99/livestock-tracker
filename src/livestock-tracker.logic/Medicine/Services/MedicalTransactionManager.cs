using LivestockTracker.Exceptions;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace LivestockTracker.Medicine;

/// <summary>
///     Provides create, read, update and delete services for medical transactions.
/// </summary>
internal class MedicalTransactionManager : IMedicalTransactionManager
{
    /// <summary>
    ///     The database context that contains the medical transactions table.
    /// </summary>
    private readonly LivestockContext _dbContext;

    /// <summary>
    ///     The logger.
    /// </summary>
    private readonly ILogger _logger;

    /// <summary>
    ///     Constructor.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="livestockContext">The database context that contains the medical transactions table.</param>
    public MedicalTransactionManager(ILogger<MedicalTransactionManager> logger,
        LivestockContext livestockContext)
    {
        _logger = logger;
        _dbContext = livestockContext;
    }

    /// <summary>
    ///     Attempts to add a medical transaction to the database context.
    /// </summary>
    /// <param name="item">The object that contains the information for the new medical transaction.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The added medical transaction.</returns>
    public async Task<MedicalTransaction> AddAsync(MedicalTransaction item, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Adding a medical transaction...");

        MedicalTransaction entity = new(item.AnimalId, item.MedicineId, item.TransactionDate, item.Dose, item.UnitId);

        if (_dbContext.MedicalTransactions.Any(transaction => transaction.Id == item.Id))
        {
            throw new ItemAlreadyExistsException<long>(item.Id, "A Medical Transaction");
        }

        EntityEntry<MedicalTransaction> changes = await _dbContext.MedicalTransactions
            .AddAsync(entity, cancellationToken)
            .ConfigureAwait(false);
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return changes.Entity;
    }

    /// <summary>
    ///     Removes a medical transaction with the given ID.
    /// </summary>
    /// <param name="key">The unique identifier value for the medical transaction.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The ID of the removed medical transaction.</returns>
    public async Task<long> RemoveAsync(long key, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Deleting medical transaction with ID {TransactionId}...", key);
        MedicalTransaction? medicalTransaction = _dbContext.MedicalTransactions.FirstOrDefault(t => t.Id == key);
        if (medicalTransaction == null)
        {
            _logger.LogWarning("Attempted to delete non-existing medical transaction with ID {TransactionId}", key);
            throw new EntityNotFoundException<MedicalTransaction>(key);
        }

        EntityEntry<MedicalTransaction> changes = _dbContext.Remove(medicalTransaction);
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        _logger.LogDebug("Deleted medical transaction with ID {TransactionId}", changes.Entity.Id);
        return changes.Entity.Id;
    }

    /// <inheritdoc />
    /// <exception cref="EntityNotFoundException{MedicalTransaction}">No such transaction exists.</exception>
    public async Task<MedicalTransaction> UpdateAsync(long id, MedicalTransaction item, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Updating medical transaction with ID {TransactionId}...", id);
        MedicalTransaction? medicalTransaction = _dbContext.MedicalTransactions.FirstOrDefault(t => t.Id == id);
        if (medicalTransaction == null)
        {
            _logger.LogWarning("Attempted to update a non-existing medical transaction with ID {TransactionId}", id);
            throw new EntityNotFoundException<MedicalTransaction>(item.Id);
        }

        medicalTransaction.Update(item);

        EntityEntry<MedicalTransaction> changes = _dbContext.Update(medicalTransaction);
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return changes.Entity;
    }
}
