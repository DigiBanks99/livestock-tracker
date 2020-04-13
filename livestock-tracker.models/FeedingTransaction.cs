using LivestockTracker.Abstractions.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models
{
    public class FeedingTransaction : IFeedingTransaction
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
    }
}
