using LivestockTracker.Abstractions.Models.Weight;
using LivestockTracker.Database.Models.Weight;
using System.Linq;

namespace LivestockTracker.Logic.Mappers.Weight
{
    /// <summary>
    /// Extensions that perform mapping operations for weight transactions.
    /// </summary>
    public static class WeightTransactionMappers
    {
        /// <summary>
        /// Maps an <see cref="IQueryable"/> of <see cref="WeightTransactionModel"/>
        /// to an <see cref="IQueryable"/> of <see cref="WeightTransaction"/>.
        /// </summary>
        /// <param name="query">The original query.</param>
        /// <returns>
        /// The projected query.
        /// </returns>
        public static IQueryable<WeightTransaction> MapToWeightTransaction(this IQueryable<WeightTransactionModel> query)
        {
            return query.Select(entity => new WeightTransaction
            {
                AnimalId = entity.Animal.Id,
                Id = entity.Id,
                TransactionDate = entity.TransactionDate,
                Weight = entity.Weight
            });
        }

        /// <summary>
        /// Maps a <see cref="WeightTransactionModel"/> to a <see cref="WeightTransaction"/>.
        /// </summary>
        /// <param name="entity">The EF model.</param>
        /// <returns>The domain model.</returns>
        public static WeightTransaction MapToWeightTransaction(this WeightTransactionModel entity) =>
            new()
            {
                AnimalId = entity.AnimalId,
                Id = entity.Id,
                TransactionDate = entity.TransactionDate,
                Weight = entity.Weight
            };
    }
}
