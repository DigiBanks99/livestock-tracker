using LivestockTracker.Abstractions;
using LivestockTracker.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace LivestockTracker.Database.Sqlite
{
    public class SqliteSeedData : ISeedData
    {
        public void Seed(IServiceProvider serviceProvider)
        {
            using var context = new LivestockContext(serviceProvider.GetRequiredService<DbContextOptions<LivestockContext>>());
            context.Database.Migrate();
            SeedFeedTypes(context);
            SeedUnits(context);
            SeedMedicine(context);
        }

        private static void SeedUnits(LivestockContext context)
        {
            if (context.Unit == null || context.Unit.Any())
            {
                return;
            }

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
            if (context.Medicine == null || context.Medicine.Any())
            {
                return;
            }

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

        private static void SeedFeedTypes(LivestockContext livestockContext)
        {
            if (livestockContext.FeedTypes.Any())
            {
                return;
            }

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
    }
}
