using System;

namespace LivestockTracker.Abstractions.Models.Weight
{
    /// <summary>
    /// Defines the domain for a weight transaction for an animal.
    /// </summary>
    public class WeightTransaction
    {
        /// <summary>
        /// The unique identifier for the transaction.
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// The unique identifier for the animal this transaction is for.
        /// </summary>
        public long AnimalId { get; set; }

        /// <summary>
        /// The weight of the animal in kilograms.
        /// </summary>
        public decimal Weight { get; set; }

        /// <summary>
        /// The date the transaction was captured on.
        /// </summary>
        public DateTimeOffset TransactionDate { get; set; }
    }
}
