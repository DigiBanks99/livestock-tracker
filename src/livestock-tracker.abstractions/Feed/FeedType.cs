namespace LivestockTracker.Feed;

/// <summary>
/// The definition of a type of feed that can be given to an animal.
/// </summary>
public class FeedType
{
    /// <summary>
    /// Creates a new instance with the default values.
    /// </summary>
    public FeedType()
    {
        Id = 0;
        Description = "New";
    }

    /// <summary>
    /// Creates a new instance in the desired state with a 0 ID to mark it as a new item.
    /// </summary>
    /// <param name="description">The friendly display of the feed.</param>
    /// <param name="deleted">Whether this feed type is soft deleted.</param>
    public FeedType(string description, bool deleted)
    {
        Description = description;
        Deleted = deleted;
    }


    /// <summary>
    /// Creates a new instance in the desired state with a 0 ID to mark it as a new item.
    /// </summary>
    /// <param name="id">The unique identifier of the feed.</param>
    /// <param name="description">The friendly display of the feed.</param>
    /// <param name="deleted">Whether this feed type is soft deleted.</param>
    public FeedType(int id, string description, bool deleted)
    {
        Id = id;
        Description = description;
        Deleted = deleted;
    }

    /// <summary>
    /// The unique identifier of the feed.
    /// </summary>
    public int Id { get; set; }
    /// <summary>
    /// The friendly display of the feed.
    /// </summary>
    public string Description { get; set; }
    /// <summary>
    /// Whether this feed type is soft deleted.
    /// </summary>
    public bool Deleted { get; set; }

    /// <summary>
    /// Change the feed type to look like the given feed type.
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
    /// Mark this feed type as soft-deleted.
    /// </summary>
    public void Delete()
    {
        Deleted = true;
    }
}
