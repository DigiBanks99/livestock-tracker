using LivestockTracker.Models;

namespace LivestockTracker.Database
{
    public class FeedingTransactionRepository : Repository<FeedingTransaction>, IFeedingTransactionRepository
    {
        public FeedingTransactionRepository(LivestockContext livestockContext): base(livestockContext) { }
    }
}
