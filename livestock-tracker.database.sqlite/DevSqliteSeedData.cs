using LivestockTracker.Abstractions;
using LivestockTracker.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace LivestockTracker.Database.Sqlite
{
    public class DevSqliteSeedData : ISeedData
    {
        public void Seed(IServiceProvider serviceProvider)
        {
            using LivestockContext context = new LivestockContext(serviceProvider.GetRequiredService<DbContextOptions<LivestockContext>>());
            SeedAnimals(context);
            SeedMedicalTransactions(context);
            SeedFeedingTransactions(context);
        }

        private static void SeedAnimals(LivestockContext context)
        {
            if (context.Animal == null || context.Animal.Any())
            {
                return;
            }

            context.Animal.AddRange(
            new Animal()
            {
                ID = 1,
                Type = AnimalType.Cattle,
                Subspecies = "Brahman",
                Number = 1,
                BatchNumber = 1,
                BirthDate = new DateTimeOffset(DateTime.UtcNow.AddDays(-15)),
                PurchaseDate = new DateTimeOffset(DateTime.UtcNow.AddDays(-13)),
                PurchasePrice = 200m,
                ArrivalWeight = 120m,
                Sold = false,
                SellPrice = null,
                Deceased = false
            });

            context.SaveChanges();
        }

        private static void SeedMedicalTransactions(LivestockContext context)
        {
            if (context.MedicalTransactions == null || context.MedicalTransactions.Any())
            {
                return;
            }

            Animal animal = context.Animal.OrderBy(a => a.Number).First();
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
                TransactionDate = DateTimeOffset.UtcNow,
                Unit = 1,
                Dose = 0.5m
            });

            context.SaveChanges();
        }

        private static void SeedFeedingTransactions(LivestockContext livestockContext)
        {
            if (livestockContext.FeedingTransactions.Any())
            {
                return;
            }

            Animal animal = livestockContext.Animal.OrderBy(a => a.Number).First();
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
                TransactionDate = DateTimeOffset.UtcNow,
                UnitTypeCode = 2
            },
            new FeedingTransaction()
            {
                ID = 2,
                AnimalID = animal.ID,
                FeedID = 2,
                Quantity = 1,
                TransactionDate = DateTimeOffset.UtcNow.AddDays(-1),
                UnitTypeCode = 2
            });

            livestockContext.SaveChanges();
        }
    }
}
