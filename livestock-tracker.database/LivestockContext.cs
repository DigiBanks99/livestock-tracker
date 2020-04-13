using LivestockTracker.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace LivestockTracker.Database
{
    public class LivestockContext : DbContext
    {
        public LivestockContext(DbContextOptions<LivestockContext> options)
                : base(options)
        {
        }

        public DbSet<AnimalModel> Animal { get; set; } = null!;
        public DbSet<MedicalTransactionModel> MedicalTransactions { get; set; } = null!;
        public DbSet<MedicineTypeModel> Medicine { get; set; } = null!;
        public DbSet<UnitModel> Unit { get; set; } = null!;
        public DbSet<FeedTypeModel> FeedTypes { get; set; } = null!;
        public DbSet<FeedingTransactionModel> FeedingTransactions { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MedicalTransactionModel>()
                .HasOne(m => m.Animal)
                .WithMany(a => a.MedicalTransactions)
                .HasForeignKey(m => m.AnimalID);
            modelBuilder.Entity<MedicalTransactionModel>()
                .HasOne(m => m.UnitOfMeasurement)
                .WithMany(u => u.MedicalTransactions)
                .HasForeignKey(m => m.Unit);
            modelBuilder.Entity<MedicalTransactionModel>()
                .HasOne(m => m.Medicine)
                .WithMany(t => t.MedicalTransactions)
                .HasForeignKey(m => m.MedicineTypeCode);

            modelBuilder.Entity<FeedingTransactionModel>()
                .HasOne(f => f.Animal)
                .WithMany(a => a.FeedingTransactions)
                .HasForeignKey(f => f.AnimalID);
            modelBuilder.Entity<FeedingTransactionModel>()
                .HasOne(m => m.UnitOfMeasurement)
                .WithMany(u => u.FeedingTransactions)
                .HasForeignKey(m => m.UnitTypeCode);
            modelBuilder.Entity<FeedingTransactionModel>()
                .HasOne(m => m.Feed)
                .WithMany(t => t.FeedingTransactions)
                .HasForeignKey(m => m.FeedID);

            base.OnModelCreating(modelBuilder);
        }
    }
}
