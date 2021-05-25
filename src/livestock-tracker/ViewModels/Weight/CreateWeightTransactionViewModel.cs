using System;

namespace LivestockTracker.ViewModels.Weight
{
    /// <summary>
    /// A model for creating weight transactions.
    /// </summary>
    public class CreateWeightTransactionViewModel
    {
        /// <summary>
        /// The unique identifier of the animal this transaction
        /// relates to.
        /// </summary>
        public long AnimalId { get; set; }

        /// <summary>
        /// The weight of the animal.
        /// </summary>
        public decimal Weight { get; set; }

        /// <summary>
        /// The date the weight was taken on.
        /// </summary>
        public DateTimeOffset TransactionDate { get; set; }
    }
}
