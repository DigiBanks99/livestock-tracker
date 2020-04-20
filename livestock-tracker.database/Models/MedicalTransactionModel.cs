using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Database.Models
{
    [Table("MedicalTransactions", Schema = "medical")]
    public class MedicalTransactionModel : IEntity<int>, IMedicalTransaction
    {
        [Column("ID")]
        [Key]
        public int Id { get; set; }
        [Column("AnimalID")]
        [Required]
        public int AnimalId { get; set; }
        [Column("MedicineID")]
        [Required]
        public int MedicineId { get; set; }
        [Required]
        public DateTimeOffset TransactionDate { get; set; }
        [Required]
        public decimal Dose { get; set; }
        [Column("UnitID")]
        [Required]
        public int UnitId { get; set; }

        public AnimalModel Animal { get; internal set; } = null!;
        public UnitModel UnitOfMeasurement { get; internal set; } = null!;
        public MedicineTypeModel Medicine { get; internal set; } = null!;

        public int GetKey()
        {
            return Id;
        }
    }
}
