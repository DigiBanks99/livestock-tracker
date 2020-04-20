using LivestockTracker.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LivestockTracker
{
    /// <summary>
    /// Provides extension methods for Livestock Tracker Database middleware.
    /// </summary>
    public static class SqliteDatabaseMiddleware
    {
        /// <summary>
        /// Adds the Livestock Tracker SQLite Database provider to the specified <see cref="IServiceCollection"/>.
        /// </summary>
        /// <param name="services">The service collection for dependency injection.</param>
        /// <returns>The extended service collection.</returns>
        public static IServiceCollection AddLivestockTrackerSqliteDatabase(this IServiceCollection services, IConfiguration config)
        {
            var connectionString = config.GetConnectionString("DefaultConnection");

            services.AddDbContext<LivestockContext>(options => options.UseSqlite(connectionString, x => x.MigrationsAssembly("livestock-tracker.database.sqlite")));
            return services;
        }
    }
}
