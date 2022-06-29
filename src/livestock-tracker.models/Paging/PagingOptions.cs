using LivestockTracker.Abstractions.Models;

namespace LivestockTracker.Models.Paging;

/// <summary>
/// Provides fields that can be used to managing paging requests.
/// </summary>
public class PagingOptions : IPagingOptions
{
    public PagingOptions() : this(0, 10)
    {

    }

    public PagingOptions(int pageNumber, int pageSize)
    {
        PageNumber = pageNumber;
        PageSize = pageSize;
    }

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
            return PageNumber * PageSize;
        }
    }
}
