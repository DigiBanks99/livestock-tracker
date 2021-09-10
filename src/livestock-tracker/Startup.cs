using LivestockTracker.Extensions;
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
        private readonly IConfiguration _configuration;
        private readonly IHostEnvironment _env;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="configuration">The application configuration information.</param>
        /// <param name="env">The current host environment.</param>
        public Startup(IConfiguration configuration, IHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        ///<summary>This method gets called by the runtime. Use this method to add services to the container.</summary>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddLivestockTrackerSqliteDatabase(_configuration, _env)
                    .AddLivestockTrackerLogic()
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

            if (env.IsDev())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.SeedLivestockDatabase()
               .UseHttpsRedirection()
               .UseStaticFiles();

            if (!env.IsDev())
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

                   if (env.IsDev())
                   {
                       spa.UseAngularCliServer("start");
                   }
               });
        }
    }
}
