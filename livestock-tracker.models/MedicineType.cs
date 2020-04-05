using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models
{
    public class MedicineType
    {
        [Key]
        public int TypeCode { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
    }
}
