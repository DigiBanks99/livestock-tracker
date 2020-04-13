using LivestockTracker.Abstractions.Data;
using LivestockTracker.Database.Models;
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

            context.SaveChanges();
        }

        private static void SeedUnits(LivestockContext context)
        {
            if (context.Unit == null || context.Unit.Any())
            {
                return;
            }

            context.Unit.AddRange(
            new UnitModel()
            {
                TypeCode = 1,
                Description = "ℓ"
            },
            new UnitModel()
            {
                TypeCode = 2,
                Description = "kg"
            });
        }

        private static void SeedMedicine(LivestockContext context)
        {
            if (context.Medicine == null || context.Medicine.Any())
            {
                return;
            }

            context.Medicine.AddRange(
            new MedicineTypeModel()
            {
                TypeCode = 1,
                Description = "Antibiotics"
            },
            new MedicineTypeModel()
            {
                TypeCode = 2,
                Description = "Painkillers"
            });
        }

        private static void SeedFeedTypes(LivestockContext livestockContext)
        {
            if (livestockContext.FeedTypes.Any())
            {
                return;
            }

            livestockContext.FeedTypes.AddRange(
            new FeedTypeModel()
            {
                ID = 1,
                Description = "Wheat"
            },
            new FeedTypeModel()
            {
                ID = 2,
                Description = "Maze"
            });
        }
    }
}
