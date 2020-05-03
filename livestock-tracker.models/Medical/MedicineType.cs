using LivestockTracker.Abstractions.Models.Medical;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Text.Json.Serialization;

namespace LivestockTracker.Models.Medical
{
    [DebuggerDisplay("{Id} - {Description} [Deleted: {Deleted}]")]
    public class MedicineType : IMedicineType
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
        [JsonIgnore]
        public bool Deleted { get; set; } = false;
    }
}
