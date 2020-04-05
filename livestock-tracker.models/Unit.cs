using LivestockTracker.Abstractions;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LivestockTracker.Models
{
    public class Unit : IEntity<int>
    {
        [Key]
        [JsonPropertyName("id")]
        public int TypeCode { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;

        public int GetKey()
        {
            return TypeCode;
        }
    }
}
