using LivestockTracker.Abstractions.Filters;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LivestockTracker.Abstractions.Models.Weight
{
    /// <summary>
    /// Defines a range of weights
    /// </summary>
    public record WeightRange
    {
        /// <summary>
        /// The constructor.
        /// </summary>
        /// <param name="lower">The weight lower bound.</param>
        /// <param name="upper">The weight upper bound.</param>
        public WeightRange(decimal lower, decimal upper)
        {
            Lower = lower;
            Upper = upper;
        }

        /// <summary>
        /// The weight lower bound.
        /// </summary>
        public decimal Lower { get; }

        /// <summary>
        /// The weight upper bound.
        /// </summary>
        public decimal Upper { get; }
    }

    /// <summary>
    /// A model for defining filters for weight transactions.
    /// </summary>
    public class WeightTransactionFilter : IQueryableFilter<WeightTransaction>
    {
        private readonly List<long> _animalIds = new();
        private WeightRange? _weightRange;

        private static readonly WeightTransactionFilter _null = new WeightTransactionFilter();

        /// <summary>
        /// The Null Object instance.
        /// </summary>
        public static WeightTransactionFilter Null => _null;

        /// <summary>
        /// The animal Ids
        /// </summary>
        public IReadOnlyList<long> AnimalIds => _animalIds;

        /// <summary>
        /// The boundaries for the weight.
        /// </summary>
        public WeightRange? WeightBounds => _weightRange;

        /// <summary>
        /// Whether the criteria will be used to include or exclude
        /// records when filtering.
        /// <br/>
        /// The default is to include.
        /// </summary>
        public bool Include { get; private set; } = true;

        /// <summary>
        /// Add an animal ID to the filter.
        /// </summary>
        /// <param name="animalId">The ID for the animal to be added.</param>
        public void AddAnimalId(long animalId)
        {
            if (this == Null)
            {
                throw new InvalidOperationException("Changes to the Null instance is not permitted.");
            }

            if (!_animalIds.Any(id => id == animalId))
            {
                _animalIds.Add(animalId);
            }
        }

        /// <summary>
        /// Remove an animal ID from the filter.
        /// </summary>
        /// <param name="animalId">The ID for the animal to be removed.</param>
        public void RemoveAnimalId(long animalId)
        {
            if (this == Null)
            {
                throw new InvalidOperationException("Changes to the Null instance is not permitted.");
            }

            if (!_animalIds.Any(id => id == animalId))
            {
                return;
            }

            _animalIds.Remove(animalId);
        }

        /// <summary>
        /// Adds a range of animal IDs to the filter.
        /// </summary>
        /// <param name="animalIds">The IDs for the animals to be added.</param>
        public void AddAnimalIds(IEnumerable<long> animalIds)
        {
            if (this == Null)
            {
                throw new InvalidOperationException("Changes to the Null instance is not permitted.");
            }

            foreach (var animalId in animalIds)
            {
                AddAnimalId(animalId);
            }
        }

        /// <summary>
        /// Set the range for the weights.
        /// </summary>
        /// <param name="lower">
        /// If not set it will include everything below the <paramref name="upper"/> limit.
        /// </param>
        /// <param name="upper">
        /// If not set it will include everything above the <paramref name="lower"/> limit.
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
                throw new ArgumentException($"{nameof(lower)} should be greater or equal to {decimal.Zero}.", nameof(lower));
            }

            _weightRange = new WeightRange(lower == null ? decimal.Zero : lower.Value,
                                           upper == null ? decimal.MaxValue : upper.Value);
        }

        /// <summary>
        /// Set the <see cref="Include"/> state of the filter. Providing <strong>false</strong>
        /// will exclude all records that match the filter.
        /// </summary>
        /// <param name="include">
        /// Whether to include records matching the filter criteria or to exclude.
        /// </param>
        public void SetIncludeState(bool include)
        {
            if (this == Null)
            {
                throw new InvalidOperationException("Changes to the Null instance is not permitted.");
            }

            Include = include;
        }

        /// <summary>
        /// Filters the <paramref name="query"/> based on the properties of this filter object.
        /// </summary>
        /// <param name="query">The <see cref="IQueryable"/> of <see cref="WeightTransaction"/> items.</param>
        /// <returns>
        /// The filtered instance of the <paramref name="query"/>.
        /// </returns>
        public IQueryable<WeightTransaction> Filter(IQueryable<WeightTransaction> query)
        {
            return Include ? FilterInclude(query) : FilterExclude(query);
        }

        private IQueryable<WeightTransaction> FilterInclude(IQueryable<WeightTransaction> query)
        {
            if (AnimalIds.Any())
            {
                query = query.Where(transaction => AnimalIds.Contains(transaction.AnimalId));
            }

            if (WeightBounds != null)
            {
                query = query.Where(transaction => transaction.Weight >= WeightBounds.Lower && transaction.Weight <= WeightBounds.Upper);
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
                query = query.Where(transaction => transaction.Weight < WeightBounds.Lower || transaction.Weight > WeightBounds.Upper);
            }
            return query;
        }
    }
}
