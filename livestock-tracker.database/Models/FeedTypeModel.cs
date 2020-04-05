using LivestockTracker.Abstractions;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Database.Models
{
    [Table("FeedTypes")]
    public class FeedTypeModel : IEntity<int>
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
