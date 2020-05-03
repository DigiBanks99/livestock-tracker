using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models.Feed;
using LivestockTracker.Database.Models.Feed;
using LivestockTracker.Models.Feed;

namespace LivestockTracker.Logic.Mappers.Feed
{
    /// <summary>
    /// Provides mapping operations between a feeding transaction DTO and a feeding transaction entity.
    /// </summary>
    public class FeedingTransactionEntityMapper : IMapper<FeedingTransactionModel, IFeedingTransaction>
    {
        /// <summary>
        /// Maps a feeding transaction DTO instance to a feeding transaction entity instance.
        /// </summary>
        /// <param name="right">The DTO instance of the feeding transaction.</param>
        /// <returns>The entity instance of the feeding transaction.</returns>
        public FeedingTransactionModel Map(IFeedingTransaction? right)
        {
            if (right == null)
            {
                return new FeedingTransactionModel();
            }

            return new FeedingTransactionModel
            {
                AnimalId = right.AnimalId,
                FeedTypeId = right.FeedTypeId,
                Id = right.Id,
                Quantity = right.Quantity,
                TransactionDate = right.TransactionDate,
                UnitId = right.UnitId
            };
        }

        /// <summary>
        /// Maps a feeding transaction entity instance to a feeding transaction DTO instance.
        /// </summary>
        /// <param name="left">The entity instance of the feeding transaction.</param>
        /// <returns>The DTO instance of the feeding transaction.</returns>
        public IFeedingTransaction Map(FeedingTransactionModel? left)
        {
            if (left == null)
            {
                return new FeedingTransaction();
            }

            return new FeedingTransaction
            {
                AnimalId = left.AnimalId,
                FeedTypeId = left.FeedTypeId,
                Id = left.Id,
                Quantity = left.Quantity,
                TransactionDate = left.TransactionDate,
                UnitId = left.UnitId
            };
        }
    }
}
