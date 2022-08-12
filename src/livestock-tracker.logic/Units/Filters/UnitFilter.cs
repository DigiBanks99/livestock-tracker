namespace LivestockTracker.Units;

/// <summary>
///     Filters the set of <see cref="Unit" /> items based on the provided criteria.
/// </summary>
/// <param name="SearchQuery">The search string to be matched.</param>
/// <param name="IncludeDeleted">Include those items that were deleted.</param>
public record UnitFilter(string? SearchQuery, bool IncludeDeleted) : IQueryableFilter<Unit>
{
    /// <inheritdoc />
    public IQueryable<Unit> Filter(IQueryable<Unit> query)
    {
        if (!string.IsNullOrEmpty(SearchQuery))
        {
            query = query.Where(unit => EF.Functions.Like(unit.Description, $"{SearchQuery}%"));
        }

        if (!IncludeDeleted)
        {
            query = query.Where(unit => !unit.Deleted);
        }

        return query;
    }
}
