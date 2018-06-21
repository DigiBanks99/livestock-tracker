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

                SeedAnimals(context);
                SeedUnits(context);
                SeedMedicine(context);
                SeedMedicalTransactions(context);
            }
        }

        private static void SeedAnimals(LivestockContext context)
        {
            if (context.Animal != null && context.Animal.Any())
                return;

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
                    SellPrice = null,
                    Deceased = false
                }
            );

            context.SaveChanges();
        }

        private static void SeedUnits(LivestockContext context)
        {
            if (context.Unit != null && context.Unit.Any())
                return;

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
            if (context.Medicine != null && context.Medicine.Any())
                return;

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

        private static void SeedMedicalTransactions(LivestockContext context)
        {
            if (context.MedicalTransactions != null && context.MedicalTransactions.Any())
                return;

            var animal = context.Animal.First();
            if (animal == null)
            {
                SeedAnimals(context);
                animal = context.Animal.First();
            }

            context.MedicalTransactions.AddRange(
                new MedicalTransaction()
                {
                    AnimalID = animal.ID,
                    MedicineTypeCode = 1,
                    TransactionDate = DateTime.Now,
                    Unit = 1,
                    Dose = 0.5m
                });

            context.SaveChanges();
        }
    }
}
