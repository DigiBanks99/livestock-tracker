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
        public int MedecineTypeCode { get; set; }
        [Required]
        public DateTime TransactionDate { get; set; }
        [Required]
        public decimal Dose { get; set; }
        [Required]
        public int Unit { get; set; }

        public Animal AnimalObject { get; set; }
    }
}
