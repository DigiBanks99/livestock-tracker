using System;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;

namespace LivestockTracker.Logic.Sorting
{
    /// <summary>
    /// Extensions for sorting various types.
    /// </summary>
    public static class SortingExtensions
    {
        /// <summary>
        /// Sorts a list based on some criteria for a property specified through an
        /// <see cref="Expression"/> delegate.
        /// </summary>
        /// <typeparam name="TData">
        /// The type of the data for the <see cref="IQueryable"/>.
        /// </typeparam>
        /// <typeparam name="TPropType">
        /// The type of the property for the sorting property.
        /// </typeparam>
        /// <param name="query">The query to be sorted.</param>
        /// <param name="sortDirection">Either ascending or descending.</param>
        /// <param name="sortExpression">
        /// An expression function that will return the property to be filtered on.
        /// </param>
        /// <returns>
        /// The updated <see cref="IQueryable"/> that has a sorting caluse added.
        /// </returns>
        public static IOrderedQueryable<TData> SortByCriteria<TData, TPropType>(this IQueryable<TData> query,
                                                                                Expression<Func<TData, TPropType>> sortExpression,
                                                                                ListSortDirection sortDirection)
        {
            return sortDirection == ListSortDirection.Ascending ? query.OrderBy(sortExpression) : query.OrderByDescending(sortExpression);
        }
    }
}
