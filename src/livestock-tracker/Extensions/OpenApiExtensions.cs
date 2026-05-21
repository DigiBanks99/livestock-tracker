using LivestockTracker.Constants;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.Extensions.DependencyInjection;

namespace LivestockTracker.Extensions;

/// <summary>
/// Provides extension methods that pertain to OpenAPI documentation.
/// </summary>
internal static class OpenApiExtensions
{
    /// <summary>
    /// Adds OpenAPI document generation to the specified <see cref="IServiceCollection"/>.
    /// </summary>
    internal static IServiceCollection AddLivestockTrackerOpenApi(this IServiceCollection services)
    {
        services.AddOpenApi(AppConstants.API_VERSION, options =>
        {
            options.AddDocumentTransformer((document, _, _) =>
            {
                document.Info.Title = AppConstants.APP_NAME;
                document.Info.Version = AppConstants.API_VERSION;
                document.Info.Description = "Provides services for managing your livestock.";
                return Task.CompletedTask;
            });
        });

        return services;
    }
}
