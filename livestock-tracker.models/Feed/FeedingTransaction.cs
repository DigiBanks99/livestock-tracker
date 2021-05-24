using LivestockTracker.Abstractions.Models.Feed;
using System;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models.Feed
{
    public class FeedingTransaction : IFeedingTransaction
    {
        public long Id { get; set; }
        [Required]
        public long AnimalId { get; set; }
        [Required]
        public int FeedTypeId { get; set; }
        [Required]
        public DateTimeOffset TransactionDate { get; set; }
        [Required]
        public decimal Quantity { get; set; }
        [Required]
        public int UnitId { get; set; }
        public IFeedType FeedType { get; set; } = new FeedType();
    }
}
