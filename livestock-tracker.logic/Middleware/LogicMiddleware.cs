using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models.Animals;
using LivestockTracker.Abstractions.Models.Feed;
using LivestockTracker.Abstractions.Services.Animals;
using LivestockTracker.Abstractions.Services.Feed;
using LivestockTracker.Database.Models;
using LivestockTracker.Logic.Mappers.Animals;
using LivestockTracker.Logic.Mappers.Feed;
using LivestockTracker.Logic.Services.Animals;
using LivestockTracker.Logic.Services.Feed;
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
        /// Adds the Livestock Tracker Logic  to the specified <see cref="IServiceCollection"/>.
        /// </summary>
        /// <param name="services">The service collection for dependency injection.</param>
        /// <returns>The <see cref="IServiceCollection"/> that contains the logic services.</returns>
        public static IServiceCollection AddLivestockTrackerLogic(this IServiceCollection services)
        {
            services.AddSingleton<IMapper<IAnimalSummary, AnimalSummary>, AnimalSummaryMapper>()
                    .AddSingleton<IMapper<AnimalModel, IAnimal>, AnimalMapper>()
                    .AddSingleton<IMapper<IFeedType, FeedType>, FeedTypeMapper>()
                    .AddSingleton<IMapper<FeedTypeModel, IFeedType>, FeedTypeEntityMapper>()
                    .AddSingleton<IMapper<FeedingTransactionModel, IFeedingTransaction>, FeedingTransactionEntityMapper>()
                    .AddScoped<IAnimalCrudService, AnimalCrudService>()
                    .AddScoped<IAnimalSearchService, AnimalSearchService>()
                    .AddScoped<IFeedTypeSearchService, FeedTypeSearchService>()
                    .AddScoped<IFeedTypeCrudService, FeedTypeCrudService>()
                    .AddScoped<IFeedingTransactionCrudService, FeedingTransactionCrudService>();

            return services;
        }
    }
}
