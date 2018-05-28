using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace LivestockTracker.Database
{
    public class LivestockContextFactory : IDesignTimeDbContextFactory<LivestockContext>
    {
        public LivestockContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<LivestockContext>();
            optionsBuilder.UseSqlite("Data Source=livestock.db");

            return new LivestockContext(optionsBuilder.Options);
        }
    }
}
