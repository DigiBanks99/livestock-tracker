using LivestockTracker.Abstractions.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models
{
    public class MedicalTransaction : IMedicalTransaction
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
    }
}
