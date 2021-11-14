using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Models.Feed;
using LivestockTracker.Database.Models.Animals;
using LivestockTracker.Database.Models.Units;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Database.Models.Feed
{
    [Table("FeedingTransactions", Schema = "feed")]
    public class FeedingTransactionModel : IEntity<long>, IFeedingTransaction, IAnimalTransaction
    {
        [Column("ID")]
        [Key]
        public long Id { get; set; }
        [Column("AnimalID")]
        [Required]
        public long AnimalId { get; set; }
        [Column("FeedTypeID")]
        [ForeignKey(nameof(FeedType))]
        [Required]
        public int FeedTypeId { get; set; }
        [Required]
        public DateTimeOffset TransactionDate { get; set; }
        [Required]
        public decimal Quantity { get; set; }
        [Column("UnitID")]
        [Required]
        public int UnitId { get; set; }

        public AnimalModel Animal { get; internal set; } = null!;
        public UnitModel UnitOfMeasurement { get; internal set; } = null!;
        public IFeedType FeedType { get; internal set; } = null!;

        public long GetKey()
        {
            return Id;
        }
    }
}
