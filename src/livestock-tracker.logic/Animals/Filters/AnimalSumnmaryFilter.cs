namespace LivestockTracker.Animals;

/// <summary>
///     Provides filtering functionality for <see cref="AnimalSummary" /> items.
/// </summary>
/// <param name="IncludeArchived">Whether to include archived items.</param>
public record AnimalSummaryFilter(bool? IncludeArchived = default) : IQueryableFilter<Animal>
{
    /// <inheritdoc />
    public IQueryable<Animal> Filter(IQueryable<Animal> query)
    {
        return !IncludeArchived.HasValue || !IncludeArchived.Value
            ? query.Where(animal => !animal.Archived)
            : query;
    }
}
