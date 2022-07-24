using Microsoft.Extensions.DependencyInjection;

namespace LivestockTracker.Feed;

/// <summary>
/// Extensions for registering Feed Services in the <see cref="IServiceCollection"/>.
/// </summary>
public static class FeedServiceCollectionExtensions
{
    /// <summary>
    /// Adds the services for Feed operations.
    /// </summary>
    /// <param name="services">The DI collection.</param>
    /// <returns>The DI collection.</returns>
    public static IServiceCollection AddFeedServices(this IServiceCollection services)
    {
        services.AddScoped<IFeedTypeManager, FeedTypeManager>()
            .AddScoped<IFeedTypeSearchService, FeedTypeSearchService>()
            .AddScoped<IFeedingTransactionManager, FeedingTransactionManager>()
            .AddScoped<IFeedingTransactionSearchService, FeedingTransactionSearchService>();

        return services;
    }
}
