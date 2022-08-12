using System.Collections.Generic;

namespace LivestockTracker.Weight;

/// <summary>
///     Defines a range of weights
/// </summary>
/// <param name="Lower">The weight lower bound.</param>
/// <param name="Upper">The weight upper bound.</param>
public record WeightRange(decimal Lower, decimal Upper);

/// <summary>
///     A model for defining filters for weight transactions.
/// </summary>
public class WeightTransactionFilter : IQueryableFilter<WeightTransaction>
{
    private readonly List<long> _animalIds = new();

    /// <summary>
    ///     The Null Object instance.
    /// </summary>
    public static WeightTransactionFilter Null { get; } = new();

    /// <summary>
    ///     The animal Ids
    /// </summary>
    public IReadOnlyList<long> AnimalIds => _animalIds;

    /// <summary>
    ///     The boundaries for the weight.
    /// </summary>
    public WeightRange? WeightBounds { get; private set; }

    /// <summary>
    ///     Whether the criteria will be used to include or exclude
    ///     records when filtering.
    ///     <br />
    ///     The default is to include.
    /// </summary>
    public bool Include { get; private set; } = true;

    /// <summary>
    ///     Filters the <paramref name="query" /> based on the properties of this filter object.
    /// </summary>
    /// <param name="query">The <see cref="IQueryable" /> of <see cref="WeightTransaction" /> items.</param>
    /// <returns>
    ///     The filtered instance of the <paramref name="query" />.
    /// </returns>
    public IQueryable<WeightTransaction> Filter(IQueryable<WeightTransaction> query)
    {
        return Include ? FilterInclude(query) : FilterExclude(query);
    }

    /// <summary>
    ///     Add an animal ID to the filter.
    /// </summary>
    /// <param name="animalId">The ID for the animal to be added.</param>
    public void AddAnimalId(long animalId)
    {
        if (this == Null)
        {
            throw new InvalidOperationException("Changes to the Null instance is not permitted.");
        }

        if (_animalIds.All(id => id != animalId))
        {
            _animalIds.Add(animalId);
        }
    }

    /// <summary>
    ///     Remove an animal ID from the filter.
    /// </summary>
    /// <param name="animalId">The ID for the animal to be removed.</param>
    public void RemoveAnimalId(long animalId)
    {
        if (this == Null)
        {
            throw new InvalidOperationException("Changes to the Null instance is not permitted.");
        }

        if (_animalIds.All(id => id != animalId))
        {
            return;
        }

        _animalIds.Remove(animalId);
    }

    /// <summary>
    ///     Adds a range of animal IDs to the filter.
    /// </summary>
    /// <param name="animalIds">The IDs for the animals to be added.</param>
    public void AddAnimalIds(IEnumerable<long> animalIds)
    {
        if (this == Null)
        {
            throw new InvalidOperationException("Changes to the Null instance is not permitted.");
        }

        foreach (long animalId in animalIds)
        {
            AddAnimalId(animalId);
        }
    }

    /// <summary>
    ///     Set the range for the weights.
    /// </summary>
    /// <param name="lower">
    ///     If not set it will include everything below the <paramref name="upper" /> limit.
    /// </param>
    /// <param name="upper">
    ///     If not set it will include everything above the <paramref name="lower" /> limit.
    /// </param>
    public void SetWeightBounds(decimal? lower,
        decimal? upper)
    {
        if (this == Null)
        {
            throw new InvalidOperationException("Changes to the Null instance is not permitted.");
        }

        if (lower < decimal.Zero)
        {
            throw new ArgumentException($"{nameof(lower)} should be greater or equal to {decimal.Zero}.",
                nameof(lower));
        }

        WeightBounds = new(lower ?? decimal.Zero, upper ?? decimal.MaxValue);
    }

    /// <summary>
    ///     Set the <see cref="Include" /> state of the filter. Providing <strong>false</strong>
    ///     will exclude all records that match the filter.
    /// </summary>
    /// <param name="include">
    ///     Whether to include records matching the filter criteria or to exclude.
    /// </param>
    public void SetIncludeState(bool include)
    {
        if (this == Null)
        {
            throw new InvalidOperationException("Changes to the Null instance is not permitted.");
        }

        Include = include;
    }

    private IQueryable<WeightTransaction> FilterInclude(IQueryable<WeightTransaction> query)
    {
        if (AnimalIds.Any())
        {
            query = query.Where(transaction => AnimalIds.Contains(transaction.AnimalId));
        }

        if (WeightBounds != null)
        {
            query = query.Where(transaction =>
                transaction.Weight >= WeightBounds.Lower && transaction.Weight <= WeightBounds.Upper);
        }

        return query;
    }

    private IQueryable<WeightTransaction> FilterExclude(IQueryable<WeightTransaction> query)
    {
        if (AnimalIds.Any())
        {
            query = query.Where(transaction => !AnimalIds.Contains(transaction.AnimalId));
        }

        if (WeightBounds != null)
        {
            query = query.Where(transaction =>
                transaction.Weight < WeightBounds.Lower || transaction.Weight > WeightBounds.Upper);
        }

        return query;
    }
}
