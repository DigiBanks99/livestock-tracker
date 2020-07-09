using LivestockTracker.Abstractions.Models.Medical;
using System;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models.Medical
{
    public class MedicalTransaction : IMedicalTransaction
    {
        [Required]
        public int Id { get; set; }
        [Required]
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
