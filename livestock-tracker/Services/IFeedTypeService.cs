using LivestockTracker.Abstractions.Services;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public interface IFeedTypeService : IService<FeedTypeModel, FeedType, int>
    {
    }
}
