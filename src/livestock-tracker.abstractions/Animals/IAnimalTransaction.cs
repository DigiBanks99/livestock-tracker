namespace LivestockTracker.Animals;

/// <summary>
///     A contract for transactions that can be performed for or on animals.
/// </summary>
public interface IAnimalTransaction
{
    /// <summary>
    ///     The animal's unique identifier.
    /// </summary>
    long AnimalId { get; }

    /// <summary>
    ///     The date the transaction was performed.
    /// </summary>
    DateTimeOffset TransactionDate { get; }

    /// <summary>
    ///     A reference to the animal.
    /// </summary>
    Animal? Animal { get; }
}
