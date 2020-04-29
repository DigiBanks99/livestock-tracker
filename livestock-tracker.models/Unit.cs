using LivestockTracker.Abstractions.Models.Units;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LivestockTracker.Models
{
    public class Unit : IUnit
    {
        public int Id { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
        [JsonIgnore]
        public bool Deleted { get; set; }
    }
}
