namespace LivestockTracker.Feed;

/// <summary>
///     The details about a feeding instance for a particular animal.
/// </summary>
public class FeedingTransaction
{
    /// <summary>
    ///     Creates a new instance of <see cref="FeedingTransaction" /> with no ID so it can be treated as an item to be
    ///     inserted.
    /// </summary>
    /// <param name="animalId">The unique identifier of the animal for which the feeding happened.</param>
    /// <param name="feedTypeId">The unique identifier of the feed that was given to the animal.</param>
    /// <param name="quantity">The amount of feed that was given to the animal measured in <paramref name="unitId" />.</param>
    /// <param name="unitId">The unique identifier of the unit of measurement for the feed that was given to the animal.</param>
    /// <param name="transactionDate">The day and time the feeding happened.</param>
    public FeedingTransaction(
        long animalId,
        int feedTypeId,
        decimal quantity,
        int unitId,
        DateTimeOffset transactionDate)
    {
        Id = 0;
        AnimalId = animalId;
        FeedTypeId = feedTypeId;
        Quantity = quantity;
        UnitId = unitId;
        TransactionDate = transactionDate;
    }

    /// <summary>
    ///     Creates a new instance of <see cref="FeedingTransaction" /> with no ID so it can be treated as an item to be
    ///     inserted.
    /// </summary>
    /// <param name="id">The unique identifier of the feeding instance.</param>
    /// <param name="animalId">The unique identifier of the animal for which the feeding happened.</param>
    /// <param name="feedTypeId">The unique identifier of the feed that was given to the animal.</param>
    /// <param name="quantity">The amount of feed that was given to the animal measured in <paramref name="unitId" />.</param>
    /// <param name="unitId">The unique identifier of the unit of measurement for the feed that was given to the animal.</param>
    /// <param name="transactionDate">The day and time the feeding happened.</param>
    public FeedingTransaction(
        long id,
        long animalId,
        int feedTypeId,
        decimal quantity,
        int unitId,
        DateTimeOffset transactionDate)
    {
        Id = id;
        AnimalId = animalId;
        FeedTypeId = feedTypeId;
        Quantity = quantity;
        UnitId = unitId;
        TransactionDate = transactionDate;
    }

    /// <summary>
    ///     The unique identifier of the feeding instance.
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    ///     The unique identifier of the animal for which the feeding happened.
    /// </summary>
    public long AnimalId { get; set; }

    /// <summary>
    ///     The unique identifier of the feed that was given to the animal.
    /// </summary>
    public int FeedTypeId { get; set; }

    /// <summary>
    ///     The amount of feed that was given to the animal measured in <see cref="UnitId" />.
    /// </summary>
    public decimal Quantity { get; set; }

    /// <summary>
    ///     The unique identifier of the unit of measurement for the feed that was given to the animal.
    /// </summary>
    public int UnitId { get; set; }

    /// <summary>
    ///     The day and time the feeding happened.
    /// </summary>
    public DateTimeOffset TransactionDate { get; set; }

    /// <summary>
    ///     The animal for which the feeding happened.
    /// </summary>
    public Animal? Animal { get; set; }

    /// <summary>
    ///     The feed that was given to the animal.
    /// </summary>
    public FeedType? Feed { get; set; }

    /// <summary>
    ///     The unit of measurement for the feed that was given to the animal.
    /// </summary>
    public Unit? UnitOfMeasurement { get; set; }

    /// <summary>
    ///     Updates the current record with the desired values where allowed.
    /// </summary>
    /// <param name="desiredValues">The desired transaction values.</param>
    /// <exception cref="ArgumentException">When an attempt is made to change the animal.</exception>
    public virtual void Update(FeedingTransaction desiredValues)
    {
        if (AnimalId != desiredValues.AnimalId)
        {
            throw new ArgumentException(
                "A transaction cannot be moved to a different animal. Capture a new transaction" +
                " for that animal and delete this one.");
        }

        FeedTypeId = desiredValues.FeedTypeId;
        UnitId = desiredValues.UnitId;
        Quantity = desiredValues.Quantity;
        TransactionDate = desiredValues.TransactionDate;
    }
}
