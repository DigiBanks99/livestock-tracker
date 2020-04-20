using LivestockTracker.Abstractions;
using LivestockTracker.Database;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;
using System;

namespace LivestockTracker.Services
{
    /// <summary>
    /// <strong>DEPRECATED</strong>: A general service for animals.
    /// </summary>
    [Obsolete("Replaced by several smaller services. Use AnimalSearchService and AnimalCrudService instead.")]
    public class AnimalService : Service<AnimalModel, Animal, int>, IAnimalService
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="context">The database context which contains animals.</param>
        /// <param name="mapper">A mapper between DTO and Entity instances.</param>
        public AnimalService(LivestockContext context, IMapper<AnimalModel, Animal> mapper)
            : base(context, mapper) { }
    }
}
