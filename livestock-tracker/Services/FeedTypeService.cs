using LivestockTracker.Database;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public class FeedTypeService : Service<FeedType, int>, IFeedTypeService
    {
        public FeedTypeService(LivestockContext context) : base(context) { }
    }
}
