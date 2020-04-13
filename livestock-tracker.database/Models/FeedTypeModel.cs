using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LivestockTracker.Database.Models
{
    [Table("FeedTypes")]
    public class FeedTypeModel : IEntity<int>, IFeedType
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;

        public List<FeedingTransactionModel> FeedingTransactions { get; set; } = null!;

        public int GetKey()
        {
            return ID;
        }
    }
}
