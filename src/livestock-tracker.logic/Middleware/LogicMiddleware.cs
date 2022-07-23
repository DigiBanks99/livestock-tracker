using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Services.Animals;
using LivestockTracker.Abstractions.Services.Units;
using LivestockTracker.Abstractions.Services.Weight;
using LivestockTracker.Animals;
using LivestockTracker.Database.Models.Animals;
using LivestockTracker.Database.Models.Units;
using LivestockTracker.Feed;
using LivestockTracker.Logic.Mappers.Animals;
using LivestockTracker.Logic.Mappers.Units;
using LivestockTracker.Logic.Services.Animals;
using LivestockTracker.Logic.Services.Units;
using LivestockTracker.Logic.Services.Weight;
using LivestockTracker.Medicine;
using LivestockTracker.Units;
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
        services.AddSingleton<IMapper<IAnimalSummary, AnimalSummary>, AnimalSummaryMapper>()
            .AddSingleton<IMapper<AnimalModel, IAnimal>, AnimalMapper>()
            .AddSingleton<IMapper<UnitModel, IUnit>, UnitMapper>()
            .AddScoped<IAnimalCrudService, AnimalCrudService>()
            .AddScoped<IAnimalSearchService, AnimalSearchService>()
            .AddScoped<IUnitCrudService, UnitCrudService>()
            .AddScoped<IWeightTransactionCrudService, WeightTransactionCrudService>()
            .AddMedicineServices()
            .AddFeedServices();

        return services;
    }
}
