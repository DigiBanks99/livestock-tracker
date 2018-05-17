using LivestockTracker.Database;
using LivestockTracker.Models;
using System.Collections.Generic;
using System.Linq;

namespace LivestockTracker.Services
{
    public class AnimalService : IAnimalService
    {
        private readonly LivestockContext _context;

        public AnimalService(LivestockContext context)
        {
            _context = context;
        }

        public List<Animal> GetAnimals()
        {
            return _context.Animal.ToList();
        }

        public Animal GetAnimal(int id)
        {
            if (!_context.Animal.Any())
                return null;

            return _context.Animal.FirstOrDefault(x => x.ID == id);
        }

        public void AddAnimal(Animal animal)
        {
            if (GetAnimal(animal.ID) != null)
                return;

            animal.ID = _context.Animal.Max(x => x.ID) + 1;
            _context.Animal.Add(animal);
        }

        public void UpdateAnimal(Animal animal)
        {
            var animalToUpdate = GetAnimal(animal.ID);
            if (animalToUpdate == null)
                throw new AnimalNotFoundException(animal.ID);

            _context.Entry(animalToUpdate).CurrentValues.SetValues(animal);
        }

        public void DeleteAnimal(int id)
        {
            var animalToRemove = GetAnimal(id);
            if (animalToRemove == null)
                return;

            _context.Animal.Remove(animalToRemove);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
