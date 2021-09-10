using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq.Expressions;

namespace LivestockTracker.Abstractions.Services
{
    /// <summary>
    /// An interface that defines functionality for a service that provides fetching functionality.
    /// </summary>
    /// <typeparam name="TDto">The type of the object to be returned.</typeparam>
    /// <typeparam name="TKey">The type of the key of the object.</typeparam>
    public interface IFetchService<TDto, TKey>
        where TDto : class
        where TKey : IConvertible
    {
        /// <summary>
        /// Retrieve an item that matches the key provided.
        /// </summary>
        /// <param name="key">The key that identifies the item being searched for.</param>
        /// <returns>
        /// <list type="bullet">
        ///     <item>The instance of the record if found.</item>
        ///     <item>Null if the item is not found.</item>
        /// </list>
        /// </returns>
        TDto? GetOne(TKey key);

        /// <summary>
        /// Retrieves items that match a specified search query, sorted as requested.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
        /// <param name="filter">The expression that must be true for an item to be included.</param>
        /// <param name="sort">The condition that defines the sorting property.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <returns>The items that match the search criteria.</returns>
        IEnumerable<TDto> Find<TSortProperty>(Expression<Func<TDto, bool>> filter, Expression<Func<TDto, TSortProperty>> sort, ListSortDirection sortDirection)
            where TSortProperty : IConvertible;
    }
}
