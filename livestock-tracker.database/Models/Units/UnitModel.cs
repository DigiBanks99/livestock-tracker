using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Models.Units;
using LivestockTracker.Database.Models.Feed;
using LivestockTracker.Database.Models.Medical;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Database.Models.Units
{
    [Table("Units", Schema = "dbo")]
    public class UnitModel : LookupValueEntity<int>, IUnit
    {
        public List<FeedingTransactionModel> FeedingTransactions { get; internal set; } = null!;
        public List<MedicalTransactionModel> MedicalTransactions { get; internal set; } = null!;
    }
}
