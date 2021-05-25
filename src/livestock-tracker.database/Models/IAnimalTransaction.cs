using LivestockTracker.Database.Models.Animals;
using System;

namespace LivestockTracker.Database.Models
{
    public interface IAnimalTransaction
    {
        long AnimalId { get; set; }
        DateTimeOffset TransactionDate { get; set; }

        AnimalModel Animal { get; }
    }
}
