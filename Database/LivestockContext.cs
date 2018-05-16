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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=livestock.db");
        }
    }
}
