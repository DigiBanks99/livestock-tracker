using LivestockTracker.Pagination;

namespace LivestockTracker.Abstractions.Pagination;

/// <summary>
///     Provides fields that can be used to managing paging requests.
/// </summary>
public class PagingOptions : IPagingOptions
{
    /// <summary>
    ///     Creates an instance of paging options with the default values.
    /// </summary>
    /// <remarks>
    ///     <list type="bullet">
    ///         <listheader>
    ///             <term>Defaults</term>
    ///             <description>Default values.</description>
    ///         </listheader>
    ///         <item>
    ///             <term>
    ///                 <see cref="PageNumber" />
    ///             </term>
    ///             <description>0</description>
    ///         </item>
    ///         <item>
    ///             <term>
    ///                 <see cref="PageSize" />
    ///             </term>
    ///             <description>10</description>
    ///         </item>
    ///     </list>
    /// </remarks>
    public PagingOptions()
    {
        PageNumber = 0;
        PageSize = 10;
    }

    /// <summary>
    ///     Creates a request with the specified pagination parameters.
    /// </summary>
    /// <param name="pageNumber">The current page number. 0 based index.</param>
    /// <param name="pageSize">The size of each page.</param>
    public PagingOptions(int pageNumber, int pageSize)
    {
        PageNumber = pageNumber;
        PageSize = pageSize;
    }

    /// <summary>
    ///     The page number requested.
    /// </summary>
    public int PageNumber { get; }

    /// <summary>
    ///     The maximum number of records to include.
    /// </summary>
    public int PageSize { get; }

    /// <inheritdoc />
    public int Offset => PageNumber * PageSize;
}
