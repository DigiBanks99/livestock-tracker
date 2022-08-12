namespace LivestockTracker.Weight;

/// <summary>
///     Defines the service endpoints required to create, read, update and delete a
///     <see cref="WeightTransaction" />.
/// </summary>
public interface IWeightTransactionManager
{
    /// <summary>
    ///     Adds a new weight transaction with the given values.
    /// </summary>
    /// <param name="requestedTransaction">The values requested for the transaction.</param>
    /// <param name="cancellationToken">A token that can be used to cancel the creation of the transaction.</param>
    /// <returns>The created transaction reference.</returns>
    Task<WeightTransaction> AddAsync(WeightTransaction requestedTransaction, CancellationToken cancellationToken);

    /// <summary>
    ///     Updates an existing weight transaction for an animal with the values desired.
    /// </summary>
    /// <param name="id">The unique identifier of the transaction to be updated.</param>
    /// <param name="desiredValues">The desired values for the transaction.</param>
    /// <param name="cancellationToken">A token that can be used to cancel the update of the transaction.</param>
    /// <returns>A reference to the updated transaction.</returns>
    Task<WeightTransaction> UpdateAsync(long id, WeightTransaction desiredValues, CancellationToken cancellationToken);

    /// <summary>
    ///     Deletes the transaction with the given identifier from the persisted store.
    /// </summary>
    /// <param name="id">The unique identifier of the transaction.</param>
    /// <param name="cancellationToken">A token that can be used to cancel the removal of the transaction.</param>
    /// <returns>The identifier of the transaction that was removed.</returns>
    Task<long> RemoveAsync(long id, CancellationToken cancellationToken);
}
