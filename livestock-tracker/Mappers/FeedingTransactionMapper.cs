using LivestockTracker.Abstractions;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;

namespace LivestockTracker.Mappers
{
    public class FeedingTransactionMapper : IMapper<FeedingTransactionModel, FeedingTransaction>
    {
        public FeedingTransactionModel Map(FeedingTransaction? right)
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

        public FeedingTransaction Map(FeedingTransactionModel? left)
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
