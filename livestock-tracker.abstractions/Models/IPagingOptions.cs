namespace LivestockTracker.Abstractions.Models
{
    /// <summary>
    /// Options for pagination requests.
    /// </summary>
    public interface IPagingOptions
    {
        /// <summary>
        /// The page that is being requested.
        /// </summary>
        int PageNumber { get; }

        /// <summary>
        /// The maximum number of records to include in the page.
        /// </summary>
        int PageSize { get; }

        /// <summary>
        /// The starting point for the records to be retrieved.
        /// </summary>
        int Offset { get; }
    }
}
