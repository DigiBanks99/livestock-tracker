namespace LivestockTracker.Abstractions.Models.Feed
{
    /// <summary>
    /// Defines the properties of a type of feed.
    /// </summary>
    public interface IFeedType
    {
        /// <summary>
        /// A key that uniquely identifies the type of feed.
        /// </summary>
        int Id { get; }

        /// <summary>
        /// A human readable description of the type of feed.
        /// </summary>
        string Description { get; }

        /// <summary>
        /// A flag to indicate if the record has been deleted.
        /// </summary>
        bool Deleted { get; }
    }
}
