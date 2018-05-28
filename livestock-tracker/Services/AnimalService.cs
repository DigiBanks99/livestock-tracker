using LivestockTracker.Database;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public class AnimalService : Service<Animal>, IAnimalService
    {

        public AnimalService(IAnimalRepository animalRepository) : base(animalRepository) { }

        public void Delete(int id)
        {
            Remove(id);
        }
    }
}
