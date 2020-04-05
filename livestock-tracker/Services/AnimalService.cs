using LivestockTracker.Database;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public class AnimalService : Service<Animal, int>, IAnimalService
    {
        public AnimalService(LivestockContext context) : base(context) { }
    }
}
