using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using LivestockTracker.Abstractions.Data;
using LivestockTracker.Medicine;
using LivestockTracker.Units;

namespace LivestockTracker.Database.Models.Units;

[Table("Units", Schema = "dbo")]
public class UnitModel : LookupValueEntity<int>, IUnit
{
    public List<MedicalTransactionModel> MedicalTransactions { get; internal set; } = new();
}
