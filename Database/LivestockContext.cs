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

        public DbSet<Animal> Animal { get; set; }
        public DbSet<MedicalTransaction> MedicalTransactions { get; set; }
        public DbSet<MedecineType> Medecine { get; set; }
        public DbSet<Unit> Unit { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=livestock.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MedicalTransaction>()
                .HasOne(m => m.AnimalObject)
                .WithMany(a => a.MedicalTransactions)
                .HasForeignKey(m => m.AnimalID)
                .HasConstraintName("FK_MedicalTransaction_Animal");

            base.OnModelCreating(modelBuilder);
        }
    }
}
