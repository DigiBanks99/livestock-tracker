using System.Linq;

namespace LivestockTracker.Abstractions.Filters
{
    /// <summary>
    /// An interface for objects that can provide filtering functionality
    /// for a particular <see cref="IQueryable"/>.
    /// </summary>
    /// <typeparam name="TData">The type of data for the query.</typeparam>
    public interface IQueryableFilter<TData>
    {
        /// <summary>
        /// Filters the <paramref name="query"/> based on some criteria.
        /// </summary>
        /// <param name="query">The query to be filtered.</param>
        /// <returns>
        /// The filtered instance of <paramref name="query"/>.
        /// </returns>
        IQueryable<TData> Filter(IQueryable<TData> query);
    }
}
