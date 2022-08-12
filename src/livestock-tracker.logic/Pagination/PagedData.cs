using System.Collections.Generic;

namespace LivestockTracker.Pagination;

/// <summary>
///     Wraps data in a pagination model.
/// </summary>
/// <typeparam name="TData">The type of the data.</typeparam>
public class PagedData<TData> : IPagedData<TData>
    where TData : class
{
    /// <summary>
    ///     Constructor.
    /// </summary>
    /// <param name="data">The data.</param>
    /// <param name="pageSize">The maximum number of records in a page.</param>
    /// <param name="currentPage">The current page number.</param>
    /// <param name="totalRecordCount">The total number of records.</param>
    public PagedData(IEnumerable<TData> data, int pageSize, int currentPage, long totalRecordCount)
    {
        Data = data;
        PageSize = pageSize;
        CurrentPage = currentPage;
        TotalRecordCount = totalRecordCount;
    }

    /// <summary>
    ///     The number of pages based on the page size and the total number of records.
    /// </summary>
    public long PageCount
    {
        get
        {
            if (TotalRecordCount == 0)
            {
                return 0;
            }

            long count = TotalRecordCount / PageSize;
            if (TotalRecordCount % PageSize > 0)
            {
                count += 1;
            }

            return count;
        }
    }

    /// <summary>
    ///     The data.
    /// </summary>
    public IEnumerable<TData> Data { get; }

    /// <summary>
    ///     The maximum number of records in a page.
    /// </summary>
    public int PageSize { get; }

    /// <summary>
    ///     The current page number.
    /// </summary>
    public int CurrentPage { get; }

    /// <summary>
    ///     The total number of records.
    /// </summary>
    public long TotalRecordCount { get; }
}
