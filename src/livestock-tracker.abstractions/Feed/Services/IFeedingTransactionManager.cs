namespace LivestockTracker.Feed;

/// <summary>
///     Provides the operations for managing feeding transactions.
/// </summary>
public interface IFeedingTransactionManager
{
    /// <summary>
    ///     Adds a new feeding transaction for an animal.
    /// </summary>
    /// <param name="transaction">The desired transaction values.</param>
    /// <param name="cancellationToken">A token that can be used to cancel long-running tasks.</param>
    /// <returns>The added feeding transaction reference.</returns>
    Task<FeedingTransaction> AddAsync(FeedingTransaction transaction, CancellationToken cancellationToken);

    /// <summary>
    ///     Updates an existing feeding transaction with the desired request values. Throws an exception if the item is not
    ///     found or the user does not have access.
    /// </summary>
    /// <param name="id">The unique identifier of the transaction to be updated.</param>
    /// <param name="request">The desired request values.</param>
    /// <param name="cancellationToken">A token that can be used to cancel long-running tasks.</param>
    /// <returns>The updated transaction reference.</returns>
    Task<FeedingTransaction> UpdateAsync(long id, FeedingTransaction request, CancellationToken cancellationToken);

    /// <summary>
    ///     Deletes a transaction with the given <paramref name="id" />. Throws an exception if the item is not found or the
    ///     user does not have access.
    /// </summary>
    /// <param name="id">The unique identifier of the transaction.</param>
    /// <param name="cancellationToken">A token that can be used to cancel long-running tasks.</param>
    /// <returns>The unique identifier of the deleted record.</returns>
    Task<long> RemoveAsync(long id, CancellationToken cancellationToken);
}
