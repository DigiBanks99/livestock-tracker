using System;
using System.Linq;
using LivestockTracker.Animals;
using LivestockTracker.Data;
using LivestockTracker.Feed;
using LivestockTracker.Units;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace LivestockTracker.Database;

internal sealed class DevSqliteSeedData : ISeedData
{
    public void Seed(IServiceProvider serviceProvider)
    {
        DbContextOptions options = serviceProvider.GetRequiredService<DbContextOptions>();
        using SqliteLivestockContext context = new(options);

        SeedAnimals(context);
        SeedMedicalTransactions(context);
        SeedFeedingTransactions(context);
        SeedWeightTransactions(context);
    }

    private static void SeedAnimals(LivestockContext context)
    {
        if (context.Animals.Any())
        {
            return;
        }

        Animal brahman = new(AnimalType.Cattle,
            "Brahman",
            1,
            1,
            new(DateTime.UtcNow.AddDays(-15)),
            new(DateTime.UtcNow.AddDays(-13)),
            200m,
            120m);

        Animal archived = new(
            AnimalType.Cattle,
            null,
            2,
            1,
            new(2021, 1, 13, 16, 22, 0, TimeSpan.FromHours(+2)),
            new(2021, 1, 15, 9, 35, 0, TimeSpan.FromHours(+2)),
            200m,
            35);
        archived.Archive();

        Animal fries = new(
            AnimalType.Cattle,
            "Fries",
            3,
            1,
            new(2021, 1, 13, 14, 10, 0, TimeSpan.FromHours(+2)),
            new(2021, 1, 15, 9, 35, 0, TimeSpan.FromHours(+2)),
            200m,
            30
        );

        context.Animals.AddRange(brahman,
            archived,
            fries);

        context.SaveChanges();
    }

    private static void SeedMedicalTransactions(LivestockContext context)
    {
        if (context.MedicalTransactions.Any())
        {
            return;
        }

        if (!context.Animals.Any())
        {
            SeedAnimals(context);
        }

        foreach (Animal? animalEntity in context.Animals)
        {
            for (int i = 0; i < 15; i++)
            {
                int medicineTypeId = i % 2 == 0 ? 2 : 1;
                animalEntity.MedicalTransactions.Add(
                    new(animalEntity.Id, medicineTypeId, animalEntity.PurchaseDate.AddDays(i), 0.5m, 1));
            }
        }

        context.SaveChanges();
    }

    private static void SeedFeedingTransactions(LivestockContext context)
    {
        if (context.FeedingTransactions.Any())
        {
            return;
        }

        if (!context.Animals.Any())
        {
            SeedAnimals(context);
        }

        Unit unit = context.Units.First();

        foreach (Animal? animalEntity in context.Animals)
        {
            for (int i = 0; i < 15; i++)
            {
                int feedTypeId = i % 2 == 0 ? 2 : 1;
                FeedingTransaction transaction = new(animalEntity.Id,
                    feedTypeId,
                    0.5m,
                    unit.Id,
                    animalEntity.PurchaseDate.AddDays(i));
                animalEntity.FeedingTransactions.Add(transaction);
            }
        }

        context.SaveChanges();
    }

    private static void SeedWeightTransactions(LivestockContext context)
    {
        if (context.WeightTransactions.Any())
        {
            return;
        }

        Animal? animal = context.Animals.OrderBy(a => a.Number).FirstOrDefault();
        if (animal == null)
        {
            SeedAnimals(context);
            animal = context.Animals.OrderBy(a => a.Number).First();
        }

        animal.WeightTransactions.Add(
            new(animal.Id, 63, DateTimeOffset.Parse("2021-01-13T16:00:00Z")));

        context.SaveChanges();
    }
}
