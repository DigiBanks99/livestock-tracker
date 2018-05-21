using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Models
{
    public class MedicalTransaction
    {
        [Key]
        public int ID { get; set; }
        public int AnimalID { get; set; }
        [ForeignKey("MedicineType")]
        [Required]
        public int MedecineTypeCode { get; set; }
        [Required]
        public DateTime TransactionDate { get; set; }
        [Required]
        public decimal Dose { get; set; }
        [ForeignKey("UnitObject")]
        [Required]
        public int Unit { get; set; }

        public Animal AnimalObject { get; set; }
        public MedecineType MedecineType { get; set; }
        public Unit UnitObject { get; set; }
    }
}
