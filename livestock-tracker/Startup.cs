using LivestockTracker.Abstractions;
using LivestockTracker.Database.Models.Medical;
using LivestockTracker.Extensions;
using LivestockTracker.Mappers;
using LivestockTracker.Models.Medical;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace LivestockTracker
{
    /// <summary>
    /// Defines and manages the application start-up process.
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="configuration">The application configuration information.</param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>
        /// The application configuration information.
        /// </summary>
        public IConfiguration Configuration { get; }

        ///<summary>This method gets called by the runtime. Use this method to add services to the container.</summary>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddLivestockTrackerSqliteDatabase(Configuration)
                    .AddLivestockTrackerLogic()
                    .AddScoped<IMedicalService, MedicalService>()
                    .AddSingleton<IMapper<MedicalTransactionModel, MedicalTransaction>, MedicalTransactionMapper>()
                    .AddSwagger();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
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
