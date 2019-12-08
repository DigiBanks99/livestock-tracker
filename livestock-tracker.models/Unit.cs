using LivestockTracker.Database;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LivestockTracker.Models
{
    public class Unit : IEntity
    {
        [Key]
        [JsonPropertyName("id")]
        public int TypeCode { get; set; }
        public string Description { get; set; }

        public int GetKey()
        {
            return TypeCode;
        }
    }
}
