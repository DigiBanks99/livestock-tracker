using Microsoft.EntityFrameworkCore;

namespace LivestockTracker.Database.Models.Weight
{
    internal static class WeightDbContextExtensions
    {
        internal static ModelBuilder ConfigureWeightModels(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WeightTransactionModel>()
                        .HasOne(transaction => transaction.Animal)
                        .WithMany(animal => animal.WeightTransactions)
                        .HasForeignKey(transaction => transaction.AnimalId)
                        .IsRequired(true);

            return modelBuilder;
        }
    }
}
