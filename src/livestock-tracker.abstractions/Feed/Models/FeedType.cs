using System.Collections.Generic;
using System.Diagnostics;

namespace LivestockTracker.Feed;

/// <summary>
///     The definition of a type of feed that can be given to an animal.
/// </summary>
[DebuggerDisplay("{Description}{Deleted ? \" (Deleted)\" : string.Empty}")]
public class FeedType
{
    /// <summary>
    ///     Creates a new instance in the desired state with a 0 ID to mark it as a new item.
    /// </summary>
    /// <param name="description">The friendly display of the feed.</param>
    public FeedType(string description)
    {
        Id = 0;
        Description = description;
    }

    /// <summary>
    ///     The unique identifier of the feed.
    /// </summary>
    public int Id { get; }

    /// <summary>
    ///     The friendly display of the feed.
    /// </summary>
    public string Description { get; private set; }

    /// <summary>
    ///     Whether this feed type is soft deleted.
    /// </summary>
    public bool Deleted { get; private set; }

    /// <summary>
    ///     The transactions where this feed was administered.
    /// </summary>
    public ICollection<FeedingTransaction> FeedingTransactions { get; } = new List<FeedingTransaction>();

    /// <summary>
    ///     Change the feed type to look like the given feed type.
    /// </summary>
    /// <param name="desiredValues">The desired values for this feed type.</param>
    public void Update(FeedType desiredValues)
    {
        if (!Deleted)
        {
            Description = desiredValues.Description;
        }

        Deleted = desiredValues.Deleted;
    }

    /// <summary>
    ///     Mark this feed type as soft-deleted.
    /// </summary>
    public void Delete()
    {
        Deleted = true;
    }
}
