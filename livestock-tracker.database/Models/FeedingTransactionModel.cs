using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Database.Models
{
    [Table("FeedingTransactions")]
    public class FeedingTransactionModel : IEntity<int>, IFeedingTransaction
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public int AnimalID { get; set; }
        [Required]
        public int FeedID { get; set; }
        [Required]
        public DateTimeOffset TransactionDate { get; set; }
        [Required]
        public decimal Quantity { get; set; }
        [Required]
        public int UnitTypeCode { get; set; }

        public AnimalModel Animal { get; internal set; } = null!;
        public UnitModel UnitOfMeasurement { get; internal set; } = null!;
        public FeedTypeModel Feed { get; internal set; } = null!;

        public int GetKey()
        {
            return ID;
        }
    }
}
