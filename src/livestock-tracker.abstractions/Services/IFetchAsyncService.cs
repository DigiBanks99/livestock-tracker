using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Abstractions.Services
{
    /// <summary>
    /// An interface that defines functionality for a service that provides fetching functionality in an
    /// asynchronous manner.
    /// </summary>
    /// <typeparam name="TData">The type of the object to be returned.</typeparam>
    /// <typeparam name="TKey">The type of the key of the object.</typeparam>
    public interface IFetchAsyncService<TData, TKey>
        where TData : class
        where TKey : IConvertible
    {
        /// <summary>
        /// Retrieve an item that matches the key provided.
        /// </summary>
        /// <param name="key">The key that identifies the item being searched for.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>
        /// <list type="bullet">
        ///     <item>The instance of the record if found.</item>
        ///     <item>Null if the item is not found.</item>
        /// </list>
        /// </returns>
        Task<TData?> GetOneAsync(TKey key, CancellationToken cancellationToken);

        /// <summary>
        /// Retrieves items that match a specified search query, sorted as requested.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
        /// <param name="filter">The expression that must be true for an item to be included.</param>
        /// <param name="sort">The condition that defines the sorting property.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The items that match the search criteria.</returns>
        Task<IEnumerable<TData>> FindAsync<TSortProperty>(Expression<Func<TData, bool>> filter,
                                                          Expression<Func<TData, TSortProperty>> sort,
                                                          ListSortDirection sortDirection,
                                                          CancellationToken cancellationToken)
            where TSortProperty : IComparable;
    }
}
