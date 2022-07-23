using System;
using System.Linq;
using LivestockTracker.Abstractions.Data;
using LivestockTracker.Database.Models.Units;
using LivestockTracker.Feed;
using LivestockTracker.Medicine;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace LivestockTracker.Database.Sqlite;

public class SqliteSeedData : ISeedData
{
    private readonly IHostEnvironment _env;

    public SqliteSeedData(IHostEnvironment env)
    {
        _env = env;
    }

    public void Seed(IServiceProvider serviceProvider)
    {
        DbContextOptions<LivestockContext> options =
            serviceProvider.GetRequiredService<DbContextOptions<LivestockContext>>();
        using LivestockContext context = new(options);
        if (_env.IsE2E())
        {
            context.Database.EnsureCreated();
        }
        else
        {
            context.Database.Migrate();
        }

        SeedFeedTypes(context);
        SeedUnits(context);
        SeedMedicine(context);

        context.SaveChanges();
    }

    private static void SeedUnits(LivestockContext context)
    {
        if (context.Units.Any())
        {
            return;
        }

        context.Units.AddRange(
            new UnitModel
            {
                Id = 1,
                Description = "ℓ"
            },
            new UnitModel
            {
                Id = 2,
                Description = "kg"
            });
    }

    private static void SeedMedicine(LivestockContext context)
    {
        if (context.MedicineTypes.Any())
        {
            return;
        }

        context.MedicineTypes.AddRange(
            new MedicineTypeModel
            {
                Id = 1,
                Description = "Antibiotics"
            },
            new MedicineTypeModel
            {
                Id = 2,
                Description = "Painkillers"
            },
            new MedicineTypeModel
            {
                Id = 3,
                Description = "Paracetamol",
                Deleted = true
            });
    }

    private static void SeedFeedTypes(LivestockContext livestockContext)
    {
        if (livestockContext.FeedTypes.Any())
        {
            return;
        }

        livestockContext.FeedTypes.AddRange(
            new FeedType(1, "Wheat", false),
            new FeedType(2, "Maize", false),
            new FeedType(3, "Pallets", true));
    }
}
