using LivestockTracker.Abstractions.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LivestockTracker.Models
{
    public class Unit : IUnit
    {
        [Key]
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
    }
}
