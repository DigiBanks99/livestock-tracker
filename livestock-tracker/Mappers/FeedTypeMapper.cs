using LivestockTracker.Abstractions;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;

namespace LivestockTracker.Mappers
{
    public class FeedTypeMapper : IMapper<FeedTypeModel, FeedType>
    {
        public FeedTypeModel Map(FeedType? right)
        {
            if (right == null)
            {
                return new FeedTypeModel();
            }

            return new FeedTypeModel
            {
                Description = right.Description,
                Id = right.Id,
                Deleted = right.Deleted
            };
        }

        public FeedType Map(FeedTypeModel? left)
        {
            if (left == null)
            {
                return new FeedType();
            }

            return new FeedType
            {
                Description = left.Description,
                Id = left.Id
            };
        }
    }
}
