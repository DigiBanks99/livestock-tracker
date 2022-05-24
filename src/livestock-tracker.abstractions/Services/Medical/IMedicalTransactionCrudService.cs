using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Medicine;

/// <summary>
/// Provides create, read and update and deletion services for medical transactions.
/// </summary>
public interface IMedicalTransactionCrudService
{
    /// <summary>
    /// Attempts to add a medical transaction to the database context.
    /// </summary>
    /// <param name="item">The object that contains the information for the new medical transaction.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The added medical transaction.</returns>
    Task<MedicalTransaction> AddAsync(MedicalTransaction item, CancellationToken cancellationToken);

    /// <summary>
    /// Removes a medical transaction with the given ID.
    /// </summary>
    /// <param name="key">The unique identifier value for the medical transaction.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The ID of the removed medical transaction.</returns>
    Task<long> RemoveAsync(long key, CancellationToken cancellationToken);

    /// <summary>
    /// Updates a medical transaction with the given values.
    /// </summary>
    /// <param name="item">The property values with which to update the medical transaction.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The updated medical transaction.</returns>
    Task<MedicalTransaction> UpdateAsync(MedicalTransaction item, CancellationToken cancellationToken);
}
