using System.Collections.Generic;
using LivestockTracker.Data;
using LivestockTracker.Database;
using LivestockTracker.Properties;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace LivestockTracker.Extensions;

/// <summary>
///     <see cref="IApplicationBuilder" /> extensions relating to the database.
/// </summary>
public static class DataServiceExtensions
{
    /// <summary>
    ///     Seeds the <see cref="LivestockContext" /> based on the given environment.
    /// </summary>
    /// <param name="app">An instance of <see cref="IApplicationBuilder" />.</param>
    /// <returns>
    ///     The extended <see cref="IApplicationBuilder" /> with the database seeded.
    /// </returns>
    public static IApplicationBuilder SeedLivestockDatabase(this IApplicationBuilder app)
    {
        if (app == null)
        {
            throw new ArgumentNullException(nameof(app));
        }

        app.ApplicationServices.SeedDatabase();

        return app;
    }

    private static void SeedDatabase(this IServiceProvider services)
    {
        using IServiceScope serviceScope = services.CreateScope();
        try
        {
            IEnumerable<ISeedData> seedDataInstances =
                serviceScope.ServiceProvider.GetRequiredService<IEnumerable<ISeedData>>();
            foreach (ISeedData seedData in seedDataInstances)
            {
                seedData.Seed(serviceScope.ServiceProvider);
            }
        }
        catch (Exception ex)
        {
            ILogger logger = services.GetRequiredService<ILoggerFactory>().CreateLogger("DataSeed");
            logger.LogError(ex, Resources.SeedDatabaseFailed);
            throw;
        }
    }
}
