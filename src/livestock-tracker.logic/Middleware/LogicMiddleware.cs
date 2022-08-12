using LivestockTracker.Animals;
using LivestockTracker.Feed;
using LivestockTracker.Medicine;
using LivestockTracker.Units;
using LivestockTracker.Weight;
using Microsoft.Extensions.DependencyInjection;

namespace LivestockTracker;

/// <summary>
///     Provides extension methods for Livestock Tracker Logic Middleware.
/// </summary>
public static class LogicMiddleware
{
    /// <summary>
    ///     Adds the Livestock Tracker Logic  to the specified <see cref="IServiceCollection" />.
    /// </summary>
    /// <param name="services">The service collection for dependency injection.</param>
    /// <returns>The <see cref="IServiceCollection" /> that contains the logic services.</returns>
    public static IServiceCollection AddLivestockTrackerLogic(this IServiceCollection services)
    {
        services.AddAnimalServices()
            .AddFeedServices()
            .AddMedicineServices()
            .AddUnitServices()
            .AddWeightServices();

        return services;
    }
}
