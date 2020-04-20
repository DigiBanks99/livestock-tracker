using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Database.Models;

namespace LivestockTracker.Logic.Mappers.Animal
{
    /// <summary>
    /// Provides mapping operations between an animal entity and an animal DTO.
    /// </summary>
    public class AnimalMapper : IMapper<AnimalModel, IAnimal>
    {
        /// <summary>
        /// Maps an animal DTO instance to an animal entity instance.
        /// </summary>
        /// <param name="right">The DTO instance of the animal.</param>
        /// <returns>The entity instance of the animal.</returns>
        public AnimalModel Map(IAnimal? right)
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

        /// <summary>
        /// Maps an animal entity instance to an animal DTO instance.
        /// </summary>
        /// <param name="left">The entity instance of the animal.</param>
        /// <returns>The DTO instance of the animal.</returns>
        public IAnimal Map(AnimalModel? left)
        {
            if (left == null)
            {
                return new Models.Animal();
            }

            return new Models.Animal
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
