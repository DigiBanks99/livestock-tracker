using LivestockTracker.Abstractions;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Database.Models
{
    [Table("Unit")]
    public class UnitModel : IEntity<int>
    {
        [Key]
        public int TypeCode { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;

        public int GetKey()
        {
            return TypeCode;
        }
    }
}
