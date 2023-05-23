using LivestockTracker.Animals;
using LivestockTracker.Feed;
using LivestockTracker.Medicine;
using LivestockTracker.Units;
using LivestockTracker.Weight;
using Microsoft.EntityFrameworkCore;

namespace LivestockTracker.Database;

public class LivestockContext : DbContext
{
    public LivestockContext(DbContextOptions options)
        : base(options)
    {
    }

    public DbSet<Animal> Animals { get; set; } = null!;
    public DbSet<FeedType> FeedTypes { get; set; } = null!;
    public DbSet<FeedingTransaction> FeedingTransactions { get; set; } = null!;
    public DbSet<KraalStats> KraalStats { get; protected set; } = null!;
    public DbSet<MedicalTransaction> MedicalTransactions { get; set; } = null!;
    public DbSet<MedicineType> MedicineTypes { get; set; } = null!;
    public DbSet<Unit> Units { get; set; } = null!;
    public DbSet<WeightTransaction> WeightTransactions { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ConfigureAnimalModels()
            .ConfigureFeedModels()
            .ConfigureMedicineModels()
            .ConfigureUnitModels()
            .ConfigureWeightModels();

        base.OnModelCreating(modelBuilder);
    }
}

internal static class ModelBuilderExtensions
{
    internal static ModelBuilder ConfigureAnimalModels(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Animal>().HasKey(transaction => transaction.Id);

        modelBuilder.Entity<KraalStats>(entity => { entity.HasNoKey(); });

        return modelBuilder;
    }

    internal static ModelBuilder ConfigureUnitModels(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Unit>().HasKey(transaction => transaction.Id);

        return modelBuilder;
    }

    internal static ModelBuilder ConfigureFeedModels(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<FeedType>().HasKey(transaction => transaction.Id);

        modelBuilder.Entity<FeedingTransaction>().HasKey(transaction => transaction.Id);
        modelBuilder.Entity<FeedingTransaction>()
            .HasOne(f => f.Animal)
            .WithMany(a => a.FeedingTransactions)
            .HasForeignKey(f => f.AnimalId);
        modelBuilder.Entity<FeedingTransaction>()
            .HasOne(m => m.UnitOfMeasurement)
            .WithMany()
            .HasForeignKey(m => m.UnitId);
        modelBuilder.Entity<FeedingTransaction>()
            .HasOne(m => m.Feed)
            .WithMany(f => f.FeedingTransactions)
            .HasForeignKey(m => m.FeedTypeId);

        return modelBuilder;
    }

    internal static ModelBuilder ConfigureMedicineModels(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MedicineType>().HasKey(transaction => transaction.Id);

        modelBuilder.Entity<MedicalTransaction>().HasKey(transaction => transaction.Id);
        modelBuilder.Entity<MedicalTransaction>()
            .HasOne(m => m.Animal)
            .WithMany(a => a.MedicalTransactions)
            .HasForeignKey(m => m.AnimalId);
        modelBuilder.Entity<MedicalTransaction>()
            .HasOne(m => m.UnitOfMeasurement)
            .WithMany()
            .HasForeignKey(m => m.UnitId);
        modelBuilder.Entity<MedicalTransaction>()
            .HasOne(m => m.Medicine)
            .WithMany(t => t.MedicalTransactions)
            .HasForeignKey(m => m.MedicineId);

        return modelBuilder;
    }
}
