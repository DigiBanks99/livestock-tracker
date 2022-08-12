using Microsoft.EntityFrameworkCore;

namespace LivestockTracker.Weight;

internal static class WeightDbContextExtensions
{
    internal static ModelBuilder ConfigureWeightModels(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<WeightTransaction>().HasKey(transaction => transaction.Id);
        modelBuilder.Entity<WeightTransaction>()
            .HasOne(transaction => transaction.Animal)
            .WithMany(animal => animal.WeightTransactions)
            .HasForeignKey(transaction => transaction.AnimalId)
            .IsRequired();

        return modelBuilder;
    }
}
