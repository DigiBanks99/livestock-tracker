using LivestockTracker.Abstractions.Data;
using LivestockTracker.Database;
using LivestockTracker.Properties;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace LivestockTracker.Extensions
{
    /// <summary>
    /// <see cref="IApplicationBuilder"/> extensions relating to the database.
    /// </summary>
    public static class DataServiceExtensions
    {
        /// <summary>
        /// Seeds the <see cref="LivestockContext"/> based on the given environment.
        /// </summary>
        /// <param name="app">An instance of <see cref="IApplicationBuilder"/>.</param>
        /// <returns>
        /// The extended <see cref="IApplicationBuilder"/> with the database seeded.
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
            using var serviceScope = services.CreateScope();
            try
            {
                var seedDataInstances = serviceScope.ServiceProvider.GetRequiredService<IEnumerable<ISeedData>>();
                foreach (var seedData in seedDataInstances)
                {
                    seedData.Seed(serviceScope.ServiceProvider);
                }
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger>();
                logger.LogError(ex, Resources.SeedDatabaseFailed);
            }
        }
    }
}
