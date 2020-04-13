using LivestockTracker.Abstractions.Models;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models
{
    public class FeedType : IFeedType
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
    }
}
