using LivestockTracker.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace LivestockTracker.Database
{
    public class SeedData
    {
        protected SeedData()
        {

        }

        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new LivestockContext(serviceProvider.GetRequiredService<DbContextOptions<LivestockContext>>()))
            {
                context.Database.Migrate();

                SeedAnimals(context);
                SeedUnits(context);
                SeedMedicine(context);
                SeedMedicalTransactions(context);
                SeedFeedTypes(context);
                SeedFeedingTransactions(context);
            }
        }

        private static void SeedAnimals(LivestockContext context)
        {
            if (context.Animal != null && context.Animal.Any())
                return;

            context.Animal.AddRange(
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
                    SellPrice = null,
                    Deceased = false
                }
            );

            context.SaveChanges();
        }

        private static void SeedUnits(LivestockContext context)
        {
            if (context.Unit != null && context.Unit.Any())
                return;

            context.Unit.AddRange(
                new Unit()
                {
                    TypeCode = 1,
                    Description = "ℓ"
                },
                new Unit()
                {
                    TypeCode = 2,
                    Description = "kg"
                });

            context.SaveChanges();
        }

        private static void SeedMedicine(LivestockContext context)
        {
            if (context.Medicine != null && context.Medicine.Any())
                return;

            context.Medicine.AddRange(
                new MedicineType()
                {
                    TypeCode = 1,
                    Description = "Antibiotics"
                },
                new MedicineType()
                {
                    TypeCode = 2,
                    Description = "Painkillers"
                });

            context.SaveChanges();
        }

        private static void SeedMedicalTransactions(LivestockContext context)
        {
            if (context.MedicalTransactions != null && context.MedicalTransactions.Any())
                return;

            var animal = context.Animal.OrderBy(a => a.Number).First();
            if (animal == null)
            {
                SeedAnimals(context);
                animal = context.Animal.OrderBy(a => a.Number).First();
            }

            context.MedicalTransactions.AddRange(
                new MedicalTransaction()
                {
                    AnimalID = animal.ID,
                    MedicineTypeCode = 1,
                    TransactionDate = DateTime.Now,
                    Unit = 1,
                    Dose = 0.5m
                });

            context.SaveChanges();
        }

        private static void SeedFeedTypes(LivestockContext livestockContext)
        {
            if (livestockContext.FeedTypes.Any())
                return;

            livestockContext.FeedTypes.AddRange(
                new FeedType()
                {
                    ID = 1,
                    Description = "Wheat"
                },
                new FeedType()
                {
                    ID = 2,
                    Description = "Maze"
                });

            livestockContext.SaveChanges();
        }

        private static void SeedFeedingTransactions(LivestockContext livestockContext)
        {
            if (livestockContext.FeedingTransactions.Any())
                return;

            var animal = livestockContext.Animal.OrderBy(a => a.Number).First();
            if (animal == null)
            {
                SeedAnimals(livestockContext);
                animal = livestockContext.Animal.OrderBy(a => a.Number).First();
            }

            livestockContext.FeedingTransactions.AddRange(
                new FeedingTransaction()
                {
                    ID = 1,
                    AnimalID = animal.ID,
                    FeedID = 1,
                    Quantity = 0.5m,
                    TransactionDate = DateTime.Now,
                    UnitTypeCode = 2
                },
                new FeedingTransaction()
                {
                    ID = 2,
                    AnimalID = animal.ID,
                    FeedID = 2,
                    Quantity = 1,
                    TransactionDate = DateTime.Now.AddDays(-1),
                    UnitTypeCode = 2
                });

            livestockContext.SaveChanges();
        }
    }
}
