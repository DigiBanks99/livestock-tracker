using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Models.Weight;
using LivestockTracker.Database.Models.Animals;
using System;

namespace LivestockTracker.Database.Models.Weight
{
    public class WeightTransactionModel : IEntity<long>, IAnimalTransaction
    {
        public long Id { get; set; }
        public long AnimalId { get; set; }
        public decimal Weight { get; set; }
        public DateTimeOffset TransactionDate { get; set; }

        public AnimalModel Animal { get; internal set; } = null!;

        public long GetKey()
        {
            return Id;
        }

        /// <summary>
        /// Sets the values that are allowed to be changed.
        /// </summary>
        /// <param name="transaction">
        /// The transaction with the updated values.
        /// </param>
        /// <exception cref="InvalidOperationException">
        /// When an attempt is made to move the transaction to another animal.
        /// </exception>
        public void SetValues(WeightTransaction transaction)
        {
            if (transaction.AnimalId != AnimalId)
            {
                throw new InvalidOperationException("Cannot move a transaction to a different animal.");
            }

            TransactionDate = transaction.TransactionDate;
            Weight = transaction.Weight;
        }
    }
}
