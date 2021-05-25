using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Enums;
using LivestockTracker.Database.Models.Animals;
using LivestockTracker.Database.Models.Feed;
using LivestockTracker.Database.Models.Medical;
using LivestockTracker.Database.Models.Weight;
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
            SeedWeightTransactions(context);
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
                    MedicineId = context.MedicineTypes.OrderBy(m => m.Description).First().Id,
                    TransactionDate = DateTimeOffset.UtcNow,
                    UnitId = context.Units.OrderBy(u => u.Description).First().Id,
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
                    AnimalId = animal.Id,
                    FeedTypeId = livestockContext.FeedTypes.OrderBy(f => f.Description).First().Id,
                    Quantity = 0.5m,
                    TransactionDate = DateTimeOffset.UtcNow,
                    UnitId = livestockContext.Units.OrderBy(u => u.Description).First().Id
                },
                new FeedingTransactionModel()
                {
                    AnimalId = animal.Id,
                    FeedTypeId = livestockContext.FeedTypes.OrderBy(f => f.Description).First().Id,
                    Quantity = 1,
                    TransactionDate = DateTimeOffset.UtcNow.AddDays(-1),
                    UnitId = livestockContext.Units.OrderBy(u => u.Description).First().Id
                });

            livestockContext.SaveChanges();
        }

        private static void SeedWeightTransactions(LivestockContext livestockContext)
        {
            if (livestockContext.WeightTransactions.Any())
            {
                return;
            }

            var animal = livestockContext.Animals.OrderBy(a => a.Number).First();
            if (animal == null)
            {
                SeedAnimals(livestockContext);
                animal = livestockContext.Animals.OrderBy(a => a.Number).First();
            }

            livestockContext.WeightTransactions.AddRange(
                new WeightTransactionModel
                {
                    AnimalId = animal.Id,
                    TransactionDate = DateTimeOffset.Parse("2021-01-13T16:00:00Z"),
                    Weight = 63
                });

            livestockContext.SaveChanges();
        }
    }
}
