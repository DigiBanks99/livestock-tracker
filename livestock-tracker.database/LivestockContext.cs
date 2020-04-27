using LivestockTracker.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Linq;

namespace LivestockTracker.Database
{
    public class LivestockContext : DbContext
    {
        public LivestockContext(DbContextOptions<LivestockContext> options)
                : base(options)
        {
        }

        public DbSet<AnimalModel> Animals { get; set; } = null!;
        public DbSet<MedicalTransactionModel> MedicalTransactions { get; set; } = null!;
        public DbSet<MedicineTypeModel> Medicine { get; set; } = null!;
        public DbSet<UnitModel> Units { get; set; } = null!;
        public DbSet<FeedTypeModel> FeedTypes { get; set; } = null!;
        public DbSet<FeedingTransactionModel> FeedingTransactions { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MedicalTransactionModel>()
                .HasOne(m => m.Animal)
                .WithMany(a => a.MedicalTransactions)
                .HasForeignKey(m => m.AnimalId);
            modelBuilder.Entity<MedicalTransactionModel>()
                .HasOne(m => m.UnitOfMeasurement)
                .WithMany(u => u.MedicalTransactions)
                .HasForeignKey(m => m.UnitId);
            modelBuilder.Entity<MedicalTransactionModel>()
                .HasOne(m => m.Medicine)
                .WithMany(t => t.MedicalTransactions)
                .HasForeignKey(m => m.MedicineId);

            modelBuilder.Entity<FeedingTransactionModel>()
                .HasOne(f => f.Animal)
                .WithMany(a => a.FeedingTransactions)
                .HasForeignKey(f => f.AnimalId);
            modelBuilder.Entity<FeedingTransactionModel>()
                .HasOne(m => m.UnitOfMeasurement)
                .WithMany(u => u.FeedingTransactions)
                .HasForeignKey(m => m.UnitId);
            modelBuilder.Entity<FeedingTransactionModel>()
                .HasOne(m => m.FeedType as FeedTypeModel)
                .WithMany(t => t!.FeedingTransactions)
                .HasForeignKey(m => m.FeedTypeId);

            base.OnModelCreating(modelBuilder);

            if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
            {
                // SQLite does not have proper support for DateTimeOffset via Entity Framework Core, see the limitations
                // here: https://docs.microsoft.com/en-us/ef/core/providers/sqlite/limitations#query-limitations
                // To work around this, when the Sqlite database provider is used, all model properties of type DateTimeOffset
                // use the DateTimeOffsetToBinaryConverter
                // Based on: https://github.com/aspnet/EntityFrameworkCore/issues/10784#issuecomment-415769754
                // This only supports millisecond precision, but should be sufficient for most use cases.
                foreach (var entityType in modelBuilder.Model.GetEntityTypes())
                {
                    var properties = entityType.ClrType
                                               .GetProperties()
                                               .Where(p => p.PropertyType == typeof(DateTimeOffset) ||
                                                           p.PropertyType == typeof(DateTimeOffset?));

                    foreach (var property in properties)
                    {
                        modelBuilder.Entity(entityType.Name)
                                    .Property(property.Name)
                                    .HasConversion(new DateTimeOffsetToBinaryConverter());
                    }
                }
            }
        }
    }
}
