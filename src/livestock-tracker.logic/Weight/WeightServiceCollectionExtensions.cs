using Microsoft.Extensions.DependencyInjection;

namespace LivestockTracker.Weight;

internal static class WeightServiceCollectionExtensions
{
    internal static IServiceCollection AddWeightServices(this IServiceCollection services)
    {
        services.AddScoped<IWeightTransactionManager, WeightTransactionManager>()
            .AddScoped<IWeightTransactionSearchService, WeightTransactionSearchService>();

        return services;
    }
}
