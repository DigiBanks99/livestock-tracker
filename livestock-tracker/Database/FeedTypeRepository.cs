using LivestockTracker.Models;

namespace LivestockTracker.Database
{
    public class FeedTypeRepository : Repository<FeedType>, IFeedTypeRepository
    {
        public FeedTypeRepository(LivestockContext livestockContext) : base(livestockContext) { }
    }
}
