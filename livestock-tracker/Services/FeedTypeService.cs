using LivestockTracker.Abstractions;
using LivestockTracker.Database;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public class FeedTypeService : Service<FeedTypeModel, FeedType, int>, IFeedTypeService
    {
        public FeedTypeService(LivestockContext context, IMapper<FeedTypeModel, FeedType> mapper)
            : base(context, mapper) { }
    }
}
