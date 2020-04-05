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
              .HasOne(m => m.AnimalObject)
              .WithMany(a => a.MedicalTransactions)
              .HasForeignKey(m => m.AnimalID);

            modelBuilder.Entity<FeedingTransactionModel>()
              .HasOne(f => f.AnimalObject)
              .WithMany(a => a.FeedingTransactions)
              .HasForeignKey(f => f.AnimalID);

            base.OnModelCreating(modelBuilder);
        }
    }
}
