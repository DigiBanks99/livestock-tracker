using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Models.Feed;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Database.Models
{
    [Table("FeedingTransactions", Schema = "feed")]
    public class FeedingTransactionModel : IEntity<int>, IFeedingTransaction
    {
        [Column("ID")]
        [Key]
        public int Id { get; set; }
        [Column("AnimalID")]
        [Required]
        public int AnimalId { get; set; }
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

        public int GetKey()
        {
            return Id;
        }
    }
}
