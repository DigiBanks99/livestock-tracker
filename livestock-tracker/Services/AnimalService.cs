using LivestockTracker.Abstractions;
using LivestockTracker.Database;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public class AnimalService : Service<AnimalModel, Animal, int>, IAnimalService
    {
        public AnimalService(LivestockContext context, IMapper<AnimalModel, Animal> mapper)
            : base(context, mapper) { }
    }
}
