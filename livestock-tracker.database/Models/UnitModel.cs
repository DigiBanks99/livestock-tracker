using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Models.Units;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Database.Models
{
    [Table("Units", Schema = "dbo")]
    public class UnitModel : IEntity<int>, IUnit
    {
        [Column("ID")]
        [Key]
        public int Id { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
        public bool Deleted { get; set; } = false;

        public List<FeedingTransactionModel> FeedingTransactions { get; internal set; } = null!;
        public List<MedicalTransactionModel> MedicalTransactions { get; internal set; } = null!;

        public int GetKey()
        {
            return Id;
        }
    }
}
