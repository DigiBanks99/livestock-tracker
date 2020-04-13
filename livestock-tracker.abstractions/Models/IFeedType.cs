namespace LivestockTracker.Abstractions.Models
{
    /// <summary>
    /// Defines the properties of a type of feed.
    /// </summary>
    public interface IFeedType
    {
        /// <summary>
        /// A key that uniquely identifies the type of feed.
        /// </summary>
        int ID { get; }

        /// <summary>
        /// A human readable description of the type of feed.
        /// </summary>
        string Description { get; }
    }
}
