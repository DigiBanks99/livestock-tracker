using LivestockTracker.Abstractions.Models;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models
{
    public class MedicineType : IMedicineType
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
    }
}
