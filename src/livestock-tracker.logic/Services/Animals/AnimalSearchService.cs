using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Filters;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Database;
using LivestockTracker.Logic.Filters;
using LivestockTracker.Logic.Paging;
using Microsoft.Extensions.Logging;

namespace LivestockTracker.Animals
{
    /// <summary>
    /// Provides search services for animals.
    /// </summary>
    public class AnimalSearchService : IAnimalSearchService
    {
        private readonly ILogger logger;
        private readonly LivestockContext dbContext;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="dbContext">The database context that contains the animals.</param>
        public AnimalSearchService(ILogger<AnimalSearchService> logger, LivestockContext dbContext)
        {
            this.logger = logger;
            this.dbContext = dbContext;
        }

        /// <inheritdoc/>
        public IPagedData<AnimalSummary> SearchPaged(IQueryableFilter<AnimalSummary> filter, IPagingOptions pagingOptions, OrderingOptions<AnimalOrderType>? orderingOptions = null)
        {
            return dbContext.Animals
                            .SelectAnimalSummaries()
                            .FilterOnObject(filter)
                            .Order(orderingOptions)
                            .Paginate(pagingOptions);
        }
    }
}
