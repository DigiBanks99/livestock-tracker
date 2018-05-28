using System.Collections.Generic;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public interface IAnimalService
    {
        IEnumerable<Animal> GetAnimals();
        void AddAnimal(Animal animal);
        void UpdateAnimal(Animal animal);
        void DeleteAnimal(int id);
        void Save();
    }
}
