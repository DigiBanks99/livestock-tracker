using System.Collections.Generic;

namespace LivestockTracker.Pagination;

/// <summary>
///     A model for paged data.
/// </summary>
/// <typeparam name="TData">The type of data that is paged.</typeparam>
public interface IPagedData<out TData>
    where TData : class
{
    /// <summary>
    ///     The data set for the page.
    /// </summary>
    IEnumerable<TData> Data { get; }

    /// <summary>
    ///     The number of items included in the page.
    /// </summary>
    int PageSize { get; }

    /// <summary>
    ///     The current page number.
    /// </summary>
    int CurrentPage { get; }

    /// <summary>
    ///     The total number of records.
    /// </summary>
    long TotalRecordCount { get; }
}
