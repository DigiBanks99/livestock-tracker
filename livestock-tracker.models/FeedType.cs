using LivestockTracker.Database;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models
{
    public class FeedType : IEntity
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Description { get; set; }

        public int GetKey()
        {
            return ID;
        }
    }
}
