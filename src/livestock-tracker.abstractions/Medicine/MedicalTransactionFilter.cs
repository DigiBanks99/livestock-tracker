using LivestockTracker.Abstractions.Filters;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LivestockTracker.Medicine
{
    /// <summary>
    /// A model for defining filters for medical transactions.
    /// </summary>
    public class MedicalTransactionFilter : IQueryableFilter<MedicalTransaction>
    {
        private readonly List<long> _animalIds = new();

        private static readonly MedicalTransactionFilter _null = new(Array.Empty<long>(), null, false);

        /// <summary>
        /// Creates a new instance of <see cref="MedicalTransactionFilter"/>.
        /// </summary>
        /// <param name="animalIds">The animal Ids.</param>
        /// <param name="medicineType">The type of medicine to filter by.</param>
        /// <param name="exclude">Whether the criteria in the other properties should be exlcuded.</param>
        public MedicalTransactionFilter(long[]? animalIds, long? medicineType, bool? exclude)
        {
            MedicineType = medicineType;
            Exclude = exclude ?? false;

            if (animalIds != null)
            {
                foreach (var animalId in animalIds)
                {
                    AddAnimalId(animalId);
                }
            }
        }

        /// <summary>
        /// The Null Object instance.
        /// </summary>
        public static MedicalTransactionFilter Null => _null;

        /// <summary>
        /// The animal Ids.
        /// </summary>
        public IReadOnlyList<long> AnimalIds => _animalIds;

        /// <summary>
        /// The type of medicine to filter by.
        /// </summary>
        public long? MedicineType { get; }

        /// <summary>
        /// Whether the criteria in the other properties should be exlcuded.
        /// </summary>
        public bool Exclude { get; }

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
        /// Filters the <paramref name="query"/> based on the properties of this filter object.
        /// </summary>
        /// <param name="query">The <see cref="IQueryable"/> of <see cref="MedicalTransaction"/> items.</param>
        /// <returns>
        /// The filtered instance of the <paramref name="query"/>.
        /// </returns>
        public IQueryable<MedicalTransaction> Filter(IQueryable<MedicalTransaction> query)
        {
            return Exclude ? FilterExclude(query) : FilterInclude(query);
        }

        private IQueryable<MedicalTransaction> FilterInclude(IQueryable<MedicalTransaction> query)
        {
            if (AnimalIds.Any())
            {
                query = query.Where(transaction => AnimalIds.Any(id => id == transaction.AnimalId));
            }

            if (MedicineType.HasValue)
            {
                query = query.Where(transaction => transaction.MedicineId == MedicineType.Value);
            }

            return query;
        }

        private IQueryable<MedicalTransaction> FilterExclude(IQueryable<MedicalTransaction> query)
        {
            if (AnimalIds.Any())
            {
                query = query.Where(transaction => !AnimalIds.Contains(transaction.AnimalId));
            }

            if (MedicineType.HasValue)
            {
                query = query.Where(transaction => transaction.MedicineId != MedicineType.Value);
            }

            return query;
        }
    }
}
