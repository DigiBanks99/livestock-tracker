namespace LivestockTracker.Logic.Filters;

/// <summary>
///     Provides generic filter extensions for <see cref="IQueryable" /> queries.
/// </summary>
public static class FilteringExtensions
{
    /// <summary>
    ///     Filters an <see cref="IQueryable" /> of <typeparamref name="TData" /> items based on
    ///     the provided <paramref name="filter" /> of <see cref="IQueryableFilter{TData}" />.
    /// </summary>
    /// <typeparam name="TData">
    ///     The type of data the <paramref name="query" /> is about.
    /// </typeparam>
    /// <param name="query">
    ///     The <see cref="IQueryable" /> query of <typeparamref name="TData" /> items.
    /// </param>
    /// <param name="filter">
    ///     The <see cref="IQueryableFilter{TData}" /> that contains the
    ///     implementation of the filter logic.
    /// </param>
    /// <returns>
    ///     The filtered version of the <paramref name="query" />.
    /// </returns>
    public static IQueryable<TData> FilterOnObject<TData>(this IQueryable<TData> query, IQueryableFilter<TData> filter)
    {
        return filter.Filter(query);
    }
}
