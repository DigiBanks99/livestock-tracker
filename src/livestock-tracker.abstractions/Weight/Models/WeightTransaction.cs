using System.Diagnostics;
using LivestockTracker.Animals;

namespace LivestockTracker.Weight;

/// <summary>
///     Defines the domain for a weight transaction for an animal.
/// </summary>
[DebuggerDisplay("{AnimalId} - {TransactionDate.ToString(\"s\")}")]
public class WeightTransaction : IAnimalTransaction
{
    /// <summary>
    ///     Creates a new instance of a weight transaction for an animal.
    /// </summary>
    /// <param name="animalId">The animal's unique identifier for which this weight was captured.</param>
    /// <param name="weight">The weight value in kilograms.</param>
    /// <param name="transactionDate">The date the weight was taken.</param>
    public WeightTransaction(long animalId, decimal weight, DateTimeOffset transactionDate)
    {
        Id = 0;
        AnimalId = animalId;
        Weight = weight;
        TransactionDate = transactionDate;
    }

    /// <summary>
    ///     The unique identifier for the transaction.
    /// </summary>
    public long Id { get; }

    /// <summary>
    ///     The weight of the animal in kilograms.
    /// </summary>
    public decimal Weight { get; private set; }

    /// <summary>
    ///     The unique identifier for the animal this transaction is for.
    /// </summary>
    public long AnimalId { get; }

    /// <summary>
    ///     The date the transaction was captured on.
    /// </summary>
    public DateTimeOffset TransactionDate { get; private set; }

    /// <summary>
    ///     The animal the weight has been captured for.
    /// </summary>
    public Animal? Animal { get; private set; }

    /// <summary>
    ///     Updates the weight transaction with the given values.
    /// </summary>
    /// <param name="desiredValues">The values the weight transaction should have.</param>
    /// <exception cref="ArgumentException">
    ///     The animal in the updated transaction does not match the original transaction's animal.
    /// </exception>
    public void Update(WeightTransaction desiredValues)
    {
        if (AnimalId != desiredValues.AnimalId)
        {
            throw new ArgumentException(
                "A transaction cannot be moved to a different animal. Capture a new transaction for that animal and delete this one.");
        }

        Weight = desiredValues.Weight;
        TransactionDate = desiredValues.TransactionDate;
    }
}
