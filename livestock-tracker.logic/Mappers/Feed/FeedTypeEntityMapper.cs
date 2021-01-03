using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models.Feed;
using LivestockTracker.Database.Models.Feed;
using LivestockTracker.Models.Feed;

namespace LivestockTracker.Logic.Mappers.Feed
{
    /// <summary>
    /// Provides mapping operations between a feed type DTO and a feed type entity.
    /// </summary>
    public class FeedTypeEntityMapper : IMapper<FeedTypeModel, IFeedType>
    {
        /// <summary>
        /// Maps a feed type DTO instance to a feed type entity instance.
        /// </summary>
        /// <param name="right">The DTO instance of the feed type.</param>
        /// <returns>The entity instance of the feed type.</returns>
        public FeedTypeModel Map(IFeedType? right)
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

        /// <summary>
        /// Maps a feed type entity instance to a feed type DTO instance.
        /// </summary>
        /// <param name="left">The entity instance of the feed type.</param>
        /// <returns>The DTO instance of the feed type.</returns>
        public IFeedType Map(FeedTypeModel? left)
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
