using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Models.Medical;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Database.Models.Medical
{
    [Table("MedicineTypes", Schema = "medical")]
    public class MedicineTypeModel : LookupValueEntity<int>, IMedicineType
    {
        public List<MedicalTransactionModel> MedicalTransactions { get; internal set; } = null!;
    }
}
