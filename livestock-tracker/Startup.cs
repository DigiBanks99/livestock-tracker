using LivestockTracker.Abstractions;
using LivestockTracker.Database;
using LivestockTracker.Database.Models;
using LivestockTracker.Extensions;
using LivestockTracker.Mappers;
using LivestockTracker.Models;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
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

            services.AddDbContext<LivestockContext>(options => options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")))
                    .AddLivestockTrackerLogic()
                    .AddScoped<IAnimalService, AnimalService>()
                    .AddScoped<IFeedTypeService, FeedTypeService>()
                    .AddScoped<IFeedingTransactionService, FeedingTransactionService>()
                    .AddScoped<IMedicalService, MedicalService>()
                    .AddScoped<IMedicineService, MedicineService>()
                    .AddScoped<IUnitService, UnitService>()
                    .AddSingleton<IMapper<AnimalModel, Animal>, AnimalMapper>()
                    .AddSingleton<IMapper<FeedingTransactionModel, FeedingTransaction>, FeedingTransactionMapper>()
                    .AddSingleton<IMapper<FeedTypeModel, FeedType>, FeedTypeMapper>()
                    .AddSingleton<IMapper<MedicalTransactionModel, MedicalTransaction>, MedicalTransactionMapper>()
                    .AddSingleton<IMapper<MedicineTypeModel, MedicineType>, MedicineTypeMapper>()
                    .AddSingleton<IMapper<UnitModel, Unit>, UnitMapper>()
                    .AddSwagger();

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
            {
                throw new ArgumentNullException(nameof(app));
            }

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

            app.SeedLivestockDatabase(env)
               .UseHttpsRedirection()
               .UseStaticFiles();

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting()
               .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");
                })
               .UseSwaggerMiddleware()
               .UseSpa(spa =>
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
    }
}
