using Microsoft.EntityFrameworkCore;

namespace LivestockTracker.Database;

internal sealed class SqliteLivestockContext : LivestockContext
{
    public SqliteLivestockContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ConfigureAnimalModels()
            .ConfigureFeedModels()
            .ConfigureMedicineModels()
            .ConfigureUnitModels()
            .ConfigureWeightModels();

        this.AdaptSqliteDates(modelBuilder);
    }
}
