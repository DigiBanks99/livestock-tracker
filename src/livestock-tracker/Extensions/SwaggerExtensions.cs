using LivestockTracker.Constants;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.IO;
using System.Reflection;

namespace LivestockTracker.Extensions
{
    /// <summary>
    /// Provides extension methods that pertain to Swagger.
    /// </summary>
    internal static class SwaggerExtensions
    {
        /// <summary>
        /// Adds a generated Swagger Doc to the specified <see cref="IServiceCollection"/>.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        internal static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc(AppConstants.API_VERSION, new OpenApiInfo
                {
                    Description = "Provides services for managing your livestock.",
                    Title = AppConstants.APP_NAME,
                    Version = AppConstants.API_VERSION
                });

                options.AddXmlDocumentToSwaggerDocs();
            });

            return services;
        }

        internal static IApplicationBuilder UseSwaggerMiddleware(this IApplicationBuilder app)
        {
            app.UseSwagger()
               .UseSwaggerUI(options =>
               {
                   options.DocumentTitle = AppConstants.APP_NAME;
                   options.SwaggerEndpoint("/swagger/v1/swagger.json", $"{AppConstants.APP_NAME} {AppConstants.API_VERSION}");
               });

            return app;
        }

        private static SwaggerGenOptions AddXmlDocumentToSwaggerDocs(this SwaggerGenOptions options)
        {
            var filePath = Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml");
            var fileInfo = new FileInfo(filePath);
            if (!fileInfo.Exists)
            {
                return options;
            }

            options.IncludeXmlComments(fileInfo.FullName);
            return options;
        }
    }
}
