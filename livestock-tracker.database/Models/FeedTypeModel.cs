using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Models.Feed;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;

namespace LivestockTracker.Database.Models
{
    [DebuggerDisplay("{ID} - {Description} [Deleted: {Deleted]")]
    [Table("FeedTypes", Schema = "feed")]
    public class FeedTypeModel : IEntity<int>, IFeedType
    {
        [Column("ID")]
        [Key]
        public int Id { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
        public bool Deleted { get; set; } = false;

        public List<FeedingTransactionModel> FeedingTransactions { get; set; } = null!;

        public int GetKey()
        {
            return Id;
        }
    }
}
