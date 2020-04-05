using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LivestockTracker.Models
{
    public class Unit
    {
        [Key]
        [JsonPropertyName("id")]
        public int TypeCode { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
    }
}
