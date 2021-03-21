using LivestockTracker.Database.Models.Animals;
using LivestockTracker.Database.Models.Feed;
using LivestockTracker.Database.Models.Medical;
using LivestockTracker.Database.Models.Units;
using LivestockTracker.Database.Models.Weight;
using Microsoft.EntityFrameworkCore;

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
        public DbSet<MedicineTypeModel> MedicineTypes { get; set; } = null!;
        public DbSet<UnitModel> Units { get; set; } = null!;
        public DbSet<FeedTypeModel> FeedTypes { get; set; } = null!;
        public DbSet<FeedingTransactionModel> FeedingTransactions { get; set; } = null!;
        public DbSet<WeightTransactionModel> WightTransactions { get; set; } = null!;

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
            modelBuilder.ConfigureWeightModels();

            base.OnModelCreating(modelBuilder);

            this.AdaptSqliteDates(modelBuilder);
        }
    }
}
