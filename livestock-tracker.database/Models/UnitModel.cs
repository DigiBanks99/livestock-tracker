using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Database.Models
{
    [Table("Unit")]
    public class UnitModel : IEntity<int>, IUnit
    {
        [Key]
        public int TypeCode { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;

        public List<FeedingTransactionModel> FeedingTransactions { get; internal set; } = null!;
        public List<MedicalTransactionModel> MedicalTransactions { get; internal set; } = null!;

        public int GetKey()
        {
            return TypeCode;
        }
    }
}
