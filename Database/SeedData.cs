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

                if (context.Animal.Any())
                {
                    return;
                }

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
                        SellPrice = null
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
