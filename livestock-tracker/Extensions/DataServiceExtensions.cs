using LivestockTracker.Database;
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
      using (var serviceScope = app.ApplicationServices.CreateScope())
      {
        try
        {
          SeedData.Initialize(serviceScope.ServiceProvider);
          if (env.IsDevelopment())
          {
            SeedData.SeedDevData(serviceScope.ServiceProvider);
          }
        }
        catch (Exception ex)
        {
          var logger = app.ApplicationServices.GetRequiredService<ILogger>();
          logger.LogError(ex, "An error occurred seeding the DB.");
        }
      }

      return app;
    }
  }
}
