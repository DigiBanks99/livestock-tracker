using LivestockTracker.Abstractions.Data;
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
    }
}
