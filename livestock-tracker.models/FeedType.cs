using LivestockTracker.Abstractions;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models
{
    public class FeedType : IEntity<int>
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;

        public int GetKey()
        {
            return ID;
        }
    }
}
