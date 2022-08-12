using Microsoft.Extensions.DependencyInjection;

namespace LivestockTracker.Animals;

internal static class AnimalServiceCollectionExtensions
{
    internal static IServiceCollection AddAnimalServices(this IServiceCollection services)
    {
        services.AddScoped<IAnimalManager, AnimalManager>()
            .AddScoped<IAnimalSearchService, AnimalSearchService>();

        return services;
    }
}
