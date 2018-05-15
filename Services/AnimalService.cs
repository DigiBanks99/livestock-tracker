using LivestockTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LivestockTracker.Services
{
    public class AnimalService : IAnimalService
    {
        private readonly List<Animal> _animals;

        public AnimalService()
        {
            _animals = GetDefaultList();
        }

        public List<Animal> GetAnimals()
        {
            return _animals;
        }

        public void AddAnimal(Animal animal)
        {
            if (_animals.Any(x => x.ID == animal.ID))
                return;

            animal.ID = _animals.Max(x => x.ID) + 1;
            _animals.Add(animal);
        }

        public void UpdateAnimal(Animal animal)
        {
            var animalToUpdateIndex = _animals.IndexOf(_animals.First(x => x.ID == animal.ID));
            if (animalToUpdateIndex < 0)
                throw new AnimalNotFoundException(animal.ID);

            _animals[animalToUpdateIndex] = animal;
        }

        private List<Animal> GetDefaultList()
        {
            return
                new List<Animal>()
                {
                    new Animal()
                    {
                        ID = 1,
                        Type = (int)LivestockType.Cattle,
                        Subspecies = "Brahman",
                        Number = 1,
                        BatchNumber = 1,
                        BirthDate = new DateTime(2018, 4, 1),
                        PurchaseDate = new DateTime(2018, 4, 15),
                        PurchasePrice = 200m,
                        ArrivalWeight = 120m,
                        Sold = false,
                        SellPrice = null
                    }
                };
        }
    }
}
