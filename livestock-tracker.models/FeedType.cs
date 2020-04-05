using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models
{
    public class FeedType
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
    }
}
