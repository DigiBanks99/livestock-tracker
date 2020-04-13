using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Database.Models
{
    [Table("Medicine")]
    public class MedicineTypeModel : IEntity<int>, IMedicineType
    {
        [Key]
        public int TypeCode { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;

        public List<MedicalTransactionModel> MedicalTransactions { get; internal set; } = null!;

        public int GetKey()
        {
            return TypeCode;
        }
    }
}
