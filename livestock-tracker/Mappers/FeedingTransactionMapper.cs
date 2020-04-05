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
                AnimalID = right.AnimalID,
                FeedID = right.FeedID,
                ID = right.ID,
                Quantity = right.Quantity,
                TransactionDate = right.TransactionDate,
                UnitTypeCode = right.UnitTypeCode
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
                AnimalID = left.AnimalID,
                FeedID = left.FeedID,
                ID = left.ID,
                Quantity = left.Quantity,
                TransactionDate = left.TransactionDate,
                UnitTypeCode = left.UnitTypeCode
            };

        }
    }
}
