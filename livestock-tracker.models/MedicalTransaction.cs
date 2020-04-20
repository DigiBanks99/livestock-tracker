using LivestockTracker.Abstractions.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models
{
    public class MedicalTransaction : IMedicalTransaction
    {
        [Key]
        public int Id { get; set; }
        public int AnimalId { get; set; }
        [Required]
        public int MedicineId { get; set; }
        [Required]
        public DateTimeOffset TransactionDate { get; set; }
        [Required]
        public decimal Dose { get; set; }
        [Required]
        public int UnitId { get; set; }
    }
}
