using LivestockTracker.Abstractions.Models.Medical;
using System;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Medicine
{
    public class MedicalTransaction
    {
        public long Id { get; set; }
        public long AnimalId { get; set; }
        public int MedicineId { get; set; }
        public DateTimeOffset TransactionDate { get; set; }
        public decimal Dose { get; set; }
        public int UnitId { get; set; }
    }
}
