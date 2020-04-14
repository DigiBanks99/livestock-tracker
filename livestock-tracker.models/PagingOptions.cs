using LivestockTracker.Abstractions.Models;

namespace LivestockTracker.Models
{
    /// <summary>
    /// Provides fields that can be used to managing paging requests.
    /// </summary>
    public class PagingOptions : IPagingOptions
    {
        /// <summary>
        /// The page number requested.
        /// </summary>
        public int PageNumber { get; set; }

        /// <summary>
        /// The maximum number of records to include.
        /// </summary>
        public int PageSize { get; set; }

        /// <inheritdoc/>
        public int Offset
        {
            get
            {
                return (PageNumber - 1) * PageSize;
            }
        }
    }
}
