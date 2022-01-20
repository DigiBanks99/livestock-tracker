using LivestockTracker.Abstractions.Models.Medical;
using LivestockTracker.Database;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Medicine
{
    /// <summary>
    /// Provides create, read, update and delete services for medical transactions.
    /// </summary>
    public class MedicalTransactionCrudService : IMedicalTransactionCrudService
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="livestockContext">The database context that contains the medical transactions table.</param>
        public MedicalTransactionCrudService(ILogger<MedicalTransactionCrudService> logger,
                                             LivestockContext livestockContext)
        {
            Logger = logger;
            LivestockContext = livestockContext;
        }

        /// <summary>
        /// The logger.
        /// </summary>
        protected ILogger Logger { get; }

        /// <summary>
        /// The database context that contains the medical transactions table.
        /// </summary>
        protected LivestockContext LivestockContext { get; }

        /// <summary>
        /// Attempts to add a medical transaction to the database context.
        /// </summary>
        /// <param name="item">The object that contains the information for the new medical transaction.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The added medical transaction.</returns>
        public virtual async Task<MedicalTransaction> AddAsync(MedicalTransaction item, CancellationToken cancellationToken)
        {
            Logger.LogInformation("Adding a medical transaction...");

            var entity = new MedicalTransactionModel
            {
                AnimalId = item.AnimalId,
                Dose = item.Dose,
                MedicineId = item.MedicineId,
                TransactionDate = item.TransactionDate,
                UnitId = item.UnitId
            };

            var changes = await LivestockContext.MedicalTransactions.AddAsync(entity, cancellationToken)
                                                                    .ConfigureAwait(false);
            await LivestockContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

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
            Logger.LogInformation($"Deleting medical transaction with ID {key}...");
            var medicalTransaction = await LivestockContext.MedicalTransactions
                                                           .FindAsync(new object[] { key }, cancellationToken)
                                                           .ConfigureAwait(false);
            if (medicalTransaction == null)
            {
                throw new EntityNotFoundException<IMedicalTransaction>(key);
            }

            var changes = LivestockContext.Remove(medicalTransaction);
            await LivestockContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
            Logger.LogDebug($"Deleted medical transaction with ID {changes.Entity.Id}.");
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
            Logger.LogInformation($"Updating medical transaction with ID {item.Id}...");
            var medicalTransaction = await LivestockContext.MedicalTransactions
                                                           .FindAsync(new object[] { item.Id }, cancellationToken)
                                                           .ConfigureAwait(false);
            if (medicalTransaction == null)
            {
                throw new EntityNotFoundException<IMedicalTransaction>(item.Id);
            }

            medicalTransaction.UpdateTransaction(item);

            var changes = LivestockContext.Update(medicalTransaction);
            await LivestockContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

            return changes.Entity.MapToMedicalTransaction();
        }
    }
}
