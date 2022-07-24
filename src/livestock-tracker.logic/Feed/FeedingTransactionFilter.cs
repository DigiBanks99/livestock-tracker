namespace LivestockTracker.Feed;

/// <summary>
///     Filters an <see cref="IQueryable" /> of <see cref="FeedingTransaction" /> items according to the provided
///     parameters.
/// </summary>
/// <param name="AnimalIds">Include/Exclude the transactions for these animals if provided.</param>
/// <param name="FeedTypeIds">Include/Exclude the transactions for these <see cref="FeedType" /> items.</param>
/// <param name="Exclude">Whether to include or exclude the filtered items.</param>
public record FeedingTransactionFilter(
        long[] AnimalIds,
        int[] FeedTypeIds,
        bool Exclude)
    : IQueryableFilter<FeedingTransaction>
{
    /// <summary>
    ///     Filters the queryable collection of feeding transactions according to the record state.
    /// </summary>
    /// <param name="query">
    ///     The <see cref="IQueryable" /> of <see cref="FeedingTransaction" /> items to be filtered.
    /// </param>
    /// <returns>
    ///     The <see cref="IQueryable" /> of <see cref="FeedingTransaction" /> appended with the filtering logic.
    /// </returns>
    public IQueryable<FeedingTransaction> Filter(IQueryable<FeedingTransaction> query)
    {
        return Exclude ? ExcludeItems(query) : IncludeItems(query);
    }

    private IQueryable<FeedingTransaction> IncludeItems(IQueryable<FeedingTransaction> query)
    {
        if (AnimalIds.Any())
        {
            query = query.Where(transaction => AnimalIds.Contains(transaction.AnimalId));
        }

        if (FeedTypeIds.Any())
        {
            query = query.Where(transaction => FeedTypeIds.Contains(transaction.FeedTypeId));
        }

        return query;
    }

    private IQueryable<FeedingTransaction> ExcludeItems(IQueryable<FeedingTransaction> query)
    {
        if (AnimalIds.Any())
        {
            query = query.Where(transaction => !AnimalIds.Contains(transaction.AnimalId));
        }

        if (FeedTypeIds.Any())
        {
            query = query.Where(transaction => !FeedTypeIds.Contains(transaction.FeedTypeId));
        }

        return query;
    }
}
