namespace LivestockTracker.Pagination;

/// <summary>
///     Provides extensions for creating paged results.
/// </summary>
public static class PagedDataExtensions
{
    /// <summary>
    ///     Creates a paged set of results of <typeparamref name="TData" /> items based on
    ///     the <paramref name="query" /> and <paramref name="options" />.
    /// </summary>
    /// <typeparam name="TData">The type of the result set.</typeparam>
    /// <param name="query">
    ///     The <see cref="IQueryable{T}" /> query of the <typeparamref name="TData" /> items.
    /// </param>
    /// <param name="options">
    ///     The pagination options.
    /// </param>
    /// <returns>
    ///     The paged result set of <typeparamref name="TData" /> items.
    /// </returns>
    public static async Task<IPagedData<TData>> CreateAsync<TData>(IQueryable<TData> query, IPagingOptions options)
        where TData : class
    {
        return new PagedData<TData>(await query.ToArrayAsync(), options.PageSize, options.PageNumber, query.Count());
    }

    /// <summary>
    ///     Creates a paged set of results of <typeparamref name="TData" /> items based on
    ///     the <paramref name="query" /> and <paramref name="options" />.
    /// </summary>
    /// <typeparam name="TData">The type of the result set.</typeparam>
    /// <param name="query">
    ///     The <see cref="IQueryable{T}" /> query of the <typeparamref name="TData" /> items.
    /// </param>
    /// <param name="options">
    ///     The pagination options.
    /// </param>
    /// <returns>
    ///     The paged result set of <typeparamref name="TData" /> items.
    /// </returns>
    public static IPagedData<TData> Paginate<TData>(this IQueryable<TData> query, IPagingOptions options)
        where TData : class
    {
        return new PagedData<TData>(query.Skip(options.Offset)
                .Take(options.PageSize)
                .ToList(),
            options.PageSize,
            options.PageNumber,
            query.Count());
    }

    /// <summary>
    ///     Enumerates a <typeparamref name="TData" /> query according to the <paramref name="options" />
    ///     into a <see cref="IPagedData{TData}" /> result.
    /// </summary>
    /// <typeparam name="TData">The type of the result set.</typeparam>
    /// <param name="query">
    ///     The <see cref="IQueryable{T}" /> query of the <typeparamref name="TData" /> items.
    /// </param>
    /// <param name="options">
    ///     The pagination options.
    /// </param>
    /// <param name="cancellationToken">A token that can be used to cancel pagination.</param>
    /// <returns>
    ///     The paged result set of <typeparamref name="TData" /> items.
    /// </returns>
    public static async Task<IPagedData<TData>> PaginateAsync<TData>(this IQueryable<TData> query,
        IPagingOptions options,
        CancellationToken cancellationToken = default)
        where TData : class
    {
        IQueryable<TData> pagedQuery = query.Skip(options.Offset)
            .Take(options.PageSize);
        Task<TData[]> collectionTask = pagedQuery.ToArrayAsync(cancellationToken);
        Task<int> countTask = query.CountAsync(cancellationToken);
        return new PagedData<TData>(await collectionTask.ConfigureAwait(false), options.PageSize, options.PageNumber,
            await countTask.ConfigureAwait(false));
    }

    /// <summary>
    ///     Create an instance of <see cref="PagedData{TData}" /> for a query and
    ///     paging options.
    /// </summary>
    /// <typeparam name="TData">The type of the result set.</typeparam>
    /// <param name="query">
    ///     The <see cref="IQueryable{T}" /> query of the <typeparamref name="TData" /> items.
    /// </param>
    /// <param name="options">
    ///     The pagination options.
    /// </param>
    /// <returns>
    ///     The paged result set of <typeparamref name="TData" /> items.
    /// </returns>
    public static PagedData<TData> Create<TData>(IQueryable<TData> query, IPagingOptions options)
        where TData : class
    {
        return new(query.ToArray(), options.PageSize, options.PageNumber, query.Count());
    }
}
