using LivestockTracker.Abstractions;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;

namespace LivestockTracker.Mappers
{
    public class AnimalMapper : IMapper<AnimalModel, Animal>
    {
        public AnimalModel Map(Animal? right)
        {
            if (right == null)
            {
                return new AnimalModel();
            }

            return new AnimalModel
            {
                ArrivalWeight = right.ArrivalWeight,
                BatchNumber = right.BatchNumber,
                BirthDate = right.BirthDate,
                DateOfDeath = right.DateOfDeath,
                Deceased = right.Deceased,
                ID = right.ID,
                Number = right.Number,
                PurchaseDate = right.PurchaseDate,
                PurchasePrice = right.PurchasePrice,
                SellDate = right.SellDate,
                SellPrice = right.SellPrice,
                Sold = right.Sold,
                Subspecies = right.Subspecies,
                Type = right.Type
            };
        }

        public Animal Map(AnimalModel? left)
        {
            if (left == null)
            {
                return new Animal();
            }

            return new Animal
            {
                ArrivalWeight = left.ArrivalWeight,
                BatchNumber = left.BatchNumber,
                BirthDate = left.BirthDate,
                DateOfDeath = left.DateOfDeath,
                Deceased = left.Deceased,
                ID = left.ID,
                Number = left.Number,
                PurchaseDate = left.PurchaseDate,
                PurchasePrice = left.PurchasePrice,
                SellDate = left.SellDate,
                SellPrice = left.SellPrice,
                Sold = left.Sold,
                Subspecies = left.Subspecies,
                Type = left.Type
            };
        }
    }
}
