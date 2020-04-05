using LivestockTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace LivestockTracker.Database
{
    public class LivestockContext : DbContext
    {
        public LivestockContext(DbContextOptions<LivestockContext> options)
                : base(options)
        {
        }

        public DbSet<Animal> Animal { get; set; } = null!;
        public DbSet<MedicalTransaction> MedicalTransactions { get; set; } = null!;
        public DbSet<MedicineType> Medicine { get; set; } = null!;
        public DbSet<Unit> Unit { get; set; } = null!;
        public DbSet<FeedType> FeedTypes { get; set; } = null!;
        public DbSet<FeedingTransaction> FeedingTransactions { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MedicalTransaction>()
              .HasOne(m => m.AnimalObject)
              .WithMany(a => a.MedicalTransactions)
              .HasForeignKey(m => m.AnimalID);

            modelBuilder.Entity<FeedingTransaction>()
              .HasOne(f => f.AnimalObject)
              .WithMany(a => a.FeedingTransactions)
              .HasForeignKey(f => f.AnimalID);

            base.OnModelCreating(modelBuilder);
        }
    }
}
