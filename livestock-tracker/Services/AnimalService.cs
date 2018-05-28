using LivestockTracker.Database;
using LivestockTracker.Models;
using System.Collections.Generic;

namespace LivestockTracker.Services
{
    public class AnimalService : IAnimalService
    {
        private readonly IAnimalRepository _animalRepo;

        public AnimalService(IAnimalRepository animalRepository)
        {
            _animalRepo = animalRepository;
        }

        public IEnumerable<Animal> GetAnimals()
        {
            return _animalRepo.GetAll();
        }

        public Animal GetAnimal(int id)
        {
            return _animalRepo.Get(id);
        }

        public void AddAnimal(Animal animal)
        {
            if (GetAnimal(animal.ID) != null)
                return;

            _animalRepo.Add(animal);
        }

        public void UpdateAnimal(Animal animal)
        {
            var animalToUpdate = GetAnimal(animal.ID);
            if (animalToUpdate == null)
                throw new AnimalNotFoundException(animal.ID);

            _animalRepo.Update(animal);
        }

        public void DeleteAnimal(int id)
        {
            var animalToRemove = GetAnimal(id);
            if (animalToRemove == null)
                return;

            _animalRepo.Remove(animalToRemove);
        }

        public void Save()
        {
            _animalRepo.SaveChanges();
        }
    }
}
