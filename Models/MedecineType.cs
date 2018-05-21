using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models
{
    public class MedecineType
    {
        [Key]
        public int TypeCode { get; set; }
        public string Description { get; set; }
    }
}
