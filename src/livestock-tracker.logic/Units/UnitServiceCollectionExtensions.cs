using Microsoft.Extensions.DependencyInjection;

namespace LivestockTracker.Units;

internal static class UnitServiceCollectionExtensions
{
    internal static IServiceCollection AddUnitServices(this IServiceCollection services)
    {
        services.AddScoped<IUnitSearchService, UnitSearchService>()
            .AddScoped<IUnitManager, UnitManager>();

        return services;
    }
}
