using LivestockTracker.Abstractions;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Database.Models
{
    [Table("FeedingTransactions")]
    public class FeedingTransactionModel : IEntity<int>
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

        public AnimalModel AnimalObject { get; internal set; } = new AnimalModel();

        public int GetKey()
        {
            return ID;
        }
    }
}
