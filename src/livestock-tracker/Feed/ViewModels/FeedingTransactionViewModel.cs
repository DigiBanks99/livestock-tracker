namespace LivestockTracker.Feed.ViewModels;

/// <summary>
///     The viewable representation of a Feeding Transaction for a particular animal.
/// </summary>
/// <param name="Id">The unique identifier of the feeding instance.</param>
/// <param name="AnimalId">The unique identifier of the animal for which the feeding happened.</param>
/// <param name="FeedTypeId">The unique identifier of the feed that was given to the animal.</param>
/// <param name="Quantity">The amount of feed that was given to the animal measured in <paramref name="UnitId" />.</param>
/// <param name="UnitId">The unique identifier of the unit of measurement for the feed that was given to the animal.</param>
/// <param name="TransactionDate">The day and time the feeding happened.</param>
public record FeedingTransactionViewModel(
    long Id,
    long AnimalId,
    int FeedTypeId,
    decimal Quantity,
    int UnitId,
    DateTimeOffset TransactionDate);

internal static class FeedingTransactionViewModelExtensions
{
    /// <summary>
    ///     Maps an instance of <see cref="FeedingTransaction" /> to an instance of <see cref="FeedingTransactionViewModel" />.
    /// </summary>
    /// <param name="transaction">The feeding transaction to be mapped.</param>
    /// <returns>The mapped view model.</returns>
    internal static FeedingTransactionViewModel ToViewModel(this FeedingTransaction transaction)
    {
        return new FeedingTransactionViewModel(transaction.Id,
            transaction.AnimalId,
            transaction.FeedTypeId,
            transaction.Quantity,
            transaction.UnitId,
            transaction.TransactionDate);
    }
}
