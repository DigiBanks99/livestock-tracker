using LivestockTracker.Abstractions.Models.Medical;
using LivestockTracker.Database;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Medicine;

/// <summary>
/// Provides create, read, update and delete services for medical transactions.
/// </summary>
internal class MedicalTransactionCrudService : IMedicalTransactionCrudService
{
    /// <summary>
    /// The logger.
    /// </summary>
    private readonly ILogger _logger;

    /// <summary>
    /// The database context that contains the medical transactions table.
    /// </summary>
    private readonly LivestockContext _dbContext;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="livestockContext">The database context that contains the medical transactions table.</param>
    public MedicalTransactionCrudService(ILogger<MedicalTransactionCrudService> logger,
                                         LivestockContext livestockContext)
    {
        _logger = logger;
        _dbContext = livestockContext;
    }

    /// <summary>
    /// Attempts to add a medical transaction to the database context.
    /// </summary>
    /// <param name="item">The object that contains the information for the new medical transaction.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The added medical transaction.</returns>
    public virtual async Task<MedicalTransaction> AddAsync(MedicalTransaction item, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Adding a medical transaction...");

        MedicalTransactionModel entity = new()
        {
            AnimalId = item.AnimalId,
            Dose = item.Dose,
            MedicineId = item.MedicineId,
            TransactionDate = item.TransactionDate,
            UnitId = item.UnitId
        };

        var changes = await _dbContext.MedicalTransactions.AddAsync(entity, cancellationToken)
                                                                .ConfigureAwait(false);
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return changes.Entity.MapToMedicalTransaction();
    }

    /// <summary>
    /// Removes a medical transaction with the given ID.
    /// </summary>
    /// <param name="key">The unique identifier value for the medical transaction.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The ID of the removed medical transaction.</returns>
    public virtual async Task<long> RemoveAsync(long key, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Deleting medical transaction with ID {transactionId}...", key);
        var medicalTransaction = _dbContext.MedicalTransactions
                                                 .FirstOrDefault(t => t.Id == key);
        if (medicalTransaction == null)
        {
            _logger.LogWarning("Attempted to delete non-existing medical transaction with ID {transactionId}.", key);
            throw new EntityNotFoundException<IMedicalTransaction>(key);
        }

        var changes = _dbContext.Remove(medicalTransaction);
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        _logger.LogDebug("Deleted medical transaction with ID {transactionId}.", changes.Entity.Id);
        return changes.Entity.Id;
    }

    /// <summary>
    /// Updates a medical transaction with the given values.
    /// </summary>
    /// <param name="item">The property values with which to update the medical transaction.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The updated medical transaction.</returns>
    public virtual async Task<MedicalTransaction> UpdateAsync(MedicalTransaction item, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Updating medical transaction with ID {transactionId}...", item.Id);
        var medicalTransaction = _dbContext.MedicalTransactions
                                                 .FirstOrDefault(t => t.Id == item.Id);
        if (medicalTransaction == null)
        {
            _logger.LogWarning("Attempted to update a non-existing medical transaction with ID {transactionId}.", item.Id);
            throw new EntityNotFoundException<IMedicalTransaction>(item.Id);
        }

        medicalTransaction.UpdateTransaction(item);

        var changes = _dbContext.Update(medicalTransaction);
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return changes.Entity.MapToMedicalTransaction();
    }
}
