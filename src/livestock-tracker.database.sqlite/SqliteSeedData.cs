using System;
using System.Linq;
using LivestockTracker.Data;
using LivestockTracker.Feed;
using LivestockTracker.Medicine;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace LivestockTracker.Database.Sqlite;

internal sealed class SqliteSeedData : ISeedData
{
    private readonly IHostEnvironment _env;

    public SqliteSeedData(IHostEnvironment env)
    {
        _env = env;
    }

    public void Seed(IServiceProvider serviceProvider)
    {
        DbContextOptions options = serviceProvider.GetRequiredService<DbContextOptions>();
        using SqliteLivestockContext context = new(options);
        if (_env.IsE2E() || _env.IsTest())
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
    }

    private static void SeedUnits(LivestockContext context)
    {
        if (context.Units.Any())
        {
            return;
        }

        context.Units.AddRange(
            new("ℓ"),
            new("kg")
        );

        context.SaveChanges();
    }

    private static void SeedMedicine(LivestockContext context)
    {
        if (context.MedicineTypes.Any())
        {
            return;
        }

        context.MedicineTypes.AddRange(
            new MedicineType("Antibiotics"),
            new MedicineType("Painkillers"),
            new MedicineType("Paracetamol"));

        context.MedicineTypes.Local.First(type => type.Description == "Paracetamol").Delete();

        context.SaveChanges();
    }

    private static void SeedFeedTypes(LivestockContext context)
    {
        if (context.FeedTypes.Any())
        {
            return;
        }

        FeedType wheat = new("Wheat");
        FeedType maize = new("Maize");
        FeedType pallets = new("Pallets");
        pallets.Delete();

        context.FeedTypes.AddRange(wheat, maize, pallets);

        context.SaveChanges();
    }
}
