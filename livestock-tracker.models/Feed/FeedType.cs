using LivestockTracker.Abstractions.Models.Feed;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Text.Json.Serialization;

namespace LivestockTracker.Models.Feed
{
    [DebuggerDisplay("{Id} - {Description} [Deleted: {Deleted}]")]
    public class FeedType : IFeedType
    {
        public int Id { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
        [JsonIgnore]
        public bool Deleted { get; set; } = false;
    }
}
