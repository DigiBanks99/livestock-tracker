using LivestockTracker.Abstractions.Models.Feed;
using System;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models
{
    public class FeedingTransaction : IFeedingTransaction
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int AnimalId { get; set; }
        [Required]
        public int FeedTypeId { get; set; }
        [Required]
        public DateTimeOffset TransactionDate { get; set; }
        [Required]
        public decimal Quantity { get; set; }
        [Required]
        public int UnitId { get; set; }
    }
}
