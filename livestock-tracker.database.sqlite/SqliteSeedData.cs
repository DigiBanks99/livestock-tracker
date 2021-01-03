using LivestockTracker.Abstractions.Data;
using LivestockTracker.Database.Models.Feed;
using LivestockTracker.Database.Models.Medical;
using LivestockTracker.Database.Models.Units;
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
            if (context.Units == null || context.Units.Any())
            {
                return;
            }

            context.Units.AddRange(
            new UnitModel()
            {
                Id = 1,
                Description = "ℓ"
            },
            new UnitModel()
            {
                Id = 2,
                Description = "kg"
            });
        }

        private static void SeedMedicine(LivestockContext context)
        {
            if (context.MedicineTypes == null || context.MedicineTypes.Any())
            {
                return;
            }

            context.MedicineTypes.AddRange(
            new MedicineTypeModel()
            {
                Id = 1,
                Description = "Antibiotics"
            },
            new MedicineTypeModel()
            {
                Id = 2,
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
                Id = 1,
                Description = "Wheat"
            },
            new FeedTypeModel()
            {
                Id = 2,
                Description = "Maze"
            });
        }
    }
}
