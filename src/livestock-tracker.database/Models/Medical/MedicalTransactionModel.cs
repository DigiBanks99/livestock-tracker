using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Models.Medical;
using LivestockTracker.Database.Models.Animals;
using LivestockTracker.Database.Models.Units;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Database.Models.Medical
{
    [Table("MedicalTransactions", Schema = "medical")]
    public class MedicalTransactionModel : IEntity<long>, IMedicalTransaction, IAnimalTransaction
    {
        [Column("ID")]
        [Key]
        public long Id { get; set; }
        [Column("AnimalID")]
        [Required]
        public long AnimalId { get; set; }
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

        public long GetKey()
        {
            return Id;
        }
    }
}
