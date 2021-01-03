using LivestockTracker.Abstractions.Models;
using System;
using System.ComponentModel;
using System.Linq.Expressions;

namespace LivestockTracker.Abstractions.Services
{
    /// <summary>
    /// Provides operation definitions for fetching paginated data.
    /// </summary>
    /// <typeparam name="TData">The type of the data that is being fetched.</typeparam>
    public interface IPagedFetchService<TData>
        where TData : class, IConvertible
    {
        /// <summary>
        /// Retrieves a paged collection of items that match a specified search query, sorted as requested.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
        /// <param name="filter">The expression that must be true for an item to be included.</param>
        /// <param name="sort">The condition that defines the sorting property.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="pagingOptions">The options for pagination.</param>
        /// <returns>A paged collection of items.</returns>
        IPagedData<TData> Find<TSortProperty>(Expression<Func<TData, bool>> filter,
                                              Expression<Func<TData, TSortProperty>> sort,
                                              ListSortDirection sortDirection,
                                              IPagingOptions pagingOptions)
            where TSortProperty : IConvertible;

        /// <summary>
        /// Retrieves a paged collection of items sorted as requested.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
        /// <param name="sort">The condition that defines the sorting property.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="pagingOptions">The options for pagination.</param>
        /// <returns>A paged collection of items.</returns>
        IPagedData<TData> Find<TSortProperty>(Expression<Func<TData, TSortProperty>> sort,
                                              ListSortDirection sortDirection,
                                              IPagingOptions pagingOptions)
            where TSortProperty : IConvertible;
    }
}
