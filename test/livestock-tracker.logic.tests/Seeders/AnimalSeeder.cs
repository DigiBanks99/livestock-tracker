using LivestockTracker.Database;
using LivestockTracker.Database.Models.Animals;

namespace LivestockTracker.Logic.Tests.Seeders
{
    internal static class AnimalSeeder
    {
        internal static void SeedTestAnimal(this LivestockContext context, long id)
        {
            var animal = new AnimalModel
            {
                Id = id
            };

            context.Animals.Add(animal);
        }
    }
}
