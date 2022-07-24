namespace LivestockTracker.Feed.ViewModels;

/// <summary>
///     A request to create a new feeding transaction for the animal.
/// </summary>
/// <param name="AnimalId">The unique identifier of the animal for which the feeding happened.</param>
/// <param name="FeedTypeId">The unique identifier of the feed that was given to the animal.</param>
/// <param name="Quantity">The amount of feed that was given to the animal measured in <paramref name="UnitId" />.</param>
/// <param name="UnitId">The unique identifier of the unit of measurement for the feed that was given to the animal.</param>
/// <param name="TransactionDate">The day and time the feeding happened.</param>
public record CreateFeedingTransactionViewModel(long AnimalId,
    int FeedTypeId,
    decimal Quantity,
    int UnitId,
    DateTimeOffset TransactionDate)
{
    /// <summary>
    ///     Maps the new feeding transaction request to an instance of <see cref="FeedingTransaction" />.
    /// </summary>
    /// <returns>The mapped instance.</returns>
    internal FeedingTransaction ToFeedingTransaction()
    {
        return new FeedingTransaction(AnimalId, FeedTypeId, Quantity, UnitId, TransactionDate);
    }
}
