using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Services.Animal;
using LivestockTracker.Database.Models;
using LivestockTracker.Logic.Mappers.Animal;
using LivestockTracker.Logic.Services.Animals;
using LivestockTracker.Models;
using Microsoft.Extensions.DependencyInjection;

namespace LivestockTracker
{
    /// <summary>
    /// Provides extension methods for Livestock Tracker Logic Middleware.
    /// </summary>
    public static class LogicMiddleware
    {
        /// <summary>
        /// Adds the Livestock Tracker Logic to the provided service collection.
        /// </summary>
        /// <param name="services">The service collection for dependency injection.</param>
        /// <returns></returns>
        public static IServiceCollection AddLivestockTrackerLogic(this IServiceCollection services)
        {
            services.AddSingleton<IMapper<IAnimalSummary, AnimalSummary>, AnimalSummaryMapper>()
                    .AddSingleton<IMapper<AnimalModel, IAnimal>, AnimalMapper>()
                    .AddScoped<IAnimalCrudService, AnimalCrudService>()
                    .AddScoped<IAnimalSearchService, AnimalSearchService>();

            return services;
        }
    }
}
