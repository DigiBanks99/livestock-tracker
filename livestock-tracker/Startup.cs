using LivestockTracker.Abstractions;
using LivestockTracker.Database;
using LivestockTracker.Database.Sqlite;
using LivestockTracker.Properties;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;

namespace LivestockTracker
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddDbContext<LivestockContext>(options => options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IAnimalService, AnimalService>();
            services.AddScoped<IFeedTypeService, FeedTypeService>();
            services.AddScoped<IFeedingTransactionService, FeedingTransactionService>();
            services.AddScoped<IMedicalService, MedicalService>();
            services.AddScoped<IMedicineService, MedicineService>();
            services.AddScoped<IUnitService, UnitService>();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (app == null)
                throw new ArgumentNullException(nameof(app));

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            SeedDatabase(app, new SqliteSeedData());
            if (env.IsDevelopment())
            {
                SeedDatabase(app, new DevSqliteSeedData());
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
          // To learn more about options for serving an Angular SPA from ASP.NET Core,
          // see https://go.microsoft.com/fwlink/?linkid=864501

          spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer("start");
                }

            });
        }

        private static void SeedDatabase(IApplicationBuilder app, ISeedData seedDataService)
        {
            using IServiceScope serviceScope = app.ApplicationServices.CreateScope();
            try
            {
                seedDataService.Seed(serviceScope.ServiceProvider);
            }
            catch (Exception ex)
            {
                var logger = app.ApplicationServices.GetRequiredService<ILogger>();
                logger.LogError(ex, Resources.SeedDatabaseFailed);
            }
        }
    }
}
