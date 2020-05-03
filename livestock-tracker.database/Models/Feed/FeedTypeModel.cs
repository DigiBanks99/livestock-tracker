using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Models.Feed;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Database.Models.Feed
{
    [Table("FeedTypes", Schema = "feed")]
    public class FeedTypeModel : LookupValueEntity<int>, IFeedType
    {
        public List<FeedingTransactionModel> FeedingTransactions { get; set; } = null!;
    }
}
