using LivestockTracker.Abstractions;
using System;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Database.Models
{
    public class MedicalTransactionModel : IEntity<int>
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

        public AnimalModel AnimalObject { get; set; } = new AnimalModel();

        public int GetKey()
        {
            return ID;
        }
    }
}
