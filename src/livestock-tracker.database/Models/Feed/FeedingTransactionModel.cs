using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LivestockTracker.Abstractions.Data;
using LivestockTracker.Database.Models;
using LivestockTracker.Database.Models.Animals;
using LivestockTracker.Database.Models.Units;

namespace LivestockTracker.Feed;

[Table("FeedingTransactions", Schema = "feed")]
public class FeedingTransactionModel : IEntity<long>, IAnimalTransaction
{
    [Column("FeedTypeID")]
    [ForeignKey(nameof(Feed))]
    [Required]
    public int FeedTypeId { get; set; }

    [Required] public decimal Quantity { get; set; }

    [Column("UnitID")] [Required] public int UnitId { get; set; }

    public UnitModel UnitOfMeasurement { get; internal set; } = null!;
    public FeedType Feed { get; internal set; } = null!;

    [Column("AnimalID")] [Required] public long AnimalId { get; set; }

    [Required] public DateTimeOffset TransactionDate { get; set; }

    public AnimalModel Animal { get; internal set; } = null!;

    [Column("ID")] [Key] public long Id { get; set; }

    public long GetKey()
    {
        return Id;
    }
}
