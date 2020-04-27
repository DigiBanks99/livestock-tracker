using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Enums;
using LivestockTracker.Database.Models;
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
            using var context = new LivestockContext(serviceProvider.GetRequiredService<DbContextOptions<LivestockContext>>());
            SeedAnimals(context);
            SeedMedicalTransactions(context);
            SeedFeedingTransactions(context);
        }

        private static void SeedAnimals(LivestockContext context)
        {
            if (context.Animals == null || context.Animals.Any())
            {
                return;
            }

            context.Animals.AddRange(
            new AnimalModel()
            {
                Id = 1,
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

            var animal = context.Animals.OrderBy(a => a.Number).First();
            if (animal == null)
            {
                SeedAnimals(context);
                animal = context.Animals.OrderBy(a => a.Number).First();
            }

            context.MedicalTransactions.AddRange(
            new MedicalTransactionModel()
            {
                AnimalId = animal.Id,
                MedicineId = 1,
                TransactionDate = DateTimeOffset.UtcNow,
                UnitId = 1,
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

            var animal = livestockContext.Animals.OrderBy(a => a.Number).First();
            if (animal == null)
            {
                SeedAnimals(livestockContext);
                animal = livestockContext.Animals.OrderBy(a => a.Number).First();
            }

            livestockContext.FeedingTransactions.AddRange(
            new FeedingTransactionModel()
            {
                Id = 1,
                AnimalId = animal.Id,
                FeedTypeId = 1,
                Quantity = 0.5m,
                TransactionDate = DateTimeOffset.UtcNow,
                UnitId = 2
            },
            new FeedingTransactionModel()
            {
                Id = 2,
                AnimalId = animal.Id,
                FeedTypeId = 2,
                Quantity = 1,
                TransactionDate = DateTimeOffset.UtcNow.AddDays(-1),
                UnitId = 2
            });

            livestockContext.SaveChanges();
        }
    }
}
