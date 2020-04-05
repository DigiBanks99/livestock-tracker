using LivestockTracker.Abstractions;
using LivestockTracker.Database.Sqlite;
using LivestockTracker.Properties;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;

namespace LivestockTracker.Extensions
{
    public static class DataServiceExtensions
    {
        public static IApplicationBuilder SeedLivestockDatabase(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (app == null)
                throw new ArgumentNullException(nameof(app));

            SeedDatabase(app, new SqliteSeedData());
            if (env.IsDevelopment())
            {
                SeedDatabase(app, new DevSqliteSeedData());
            }

            return app;
        }

        private static void SeedDatabase(IApplicationBuilder app, ISeedData seedData)
        {
            using IServiceScope serviceScope = app.ApplicationServices.CreateScope();
            try
            {
                seedData.Seed(serviceScope.ServiceProvider);
            }
            catch (Exception ex)
            {
                ILogger logger = app.ApplicationServices.GetRequiredService<ILogger>();
                logger.LogError(ex, Resources.SeedDatabaseFailed);
            }
        }
    }
}
