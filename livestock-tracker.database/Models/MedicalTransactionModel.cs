using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Database.Models
{
    [Table("MedicalTransactions")]
    public class MedicalTransactionModel : IEntity<int>, IMedicalTransaction
    {
        [Key]
        public int ID { get; set; }
        public int AnimalID { get; set; }
        [Required]
        public int MedicineTypeCode { get; set; }
        [Required]
        public DateTimeOffset TransactionDate { get; set; }
        [Required]
        public decimal Dose { get; set; }
        [Required]
        public int Unit { get; set; }

        public AnimalModel Animal { get; internal set; } = null!;
        public UnitModel UnitOfMeasurement { get; internal set; } = null!;
        public MedicineTypeModel Medicine { get; internal set; } = null!;

        public int GetKey()
        {
            return ID;
        }
    }
}
