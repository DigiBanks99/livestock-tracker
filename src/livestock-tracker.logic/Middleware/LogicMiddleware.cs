using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models.Feed;
using LivestockTracker.Abstractions.Models.Units;
using LivestockTracker.Abstractions.Services.Animals;
using LivestockTracker.Abstractions.Services.Feed;
using LivestockTracker.Abstractions.Services.Units;
using LivestockTracker.Abstractions.Services.Weight;
using LivestockTracker.Animals;
using LivestockTracker.Database.Models.Animals;
using LivestockTracker.Database.Models.Feed;
using LivestockTracker.Database.Models.Units;
using LivestockTracker.Logic.Mappers.Animals;
using LivestockTracker.Logic.Mappers.Feed;
using LivestockTracker.Logic.Mappers.Units;
using LivestockTracker.Logic.Services.Animals;
using LivestockTracker.Logic.Services.Feed;
using LivestockTracker.Logic.Services.Units;
using LivestockTracker.Logic.Services.Weight;
using LivestockTracker.Medicine;
using LivestockTracker.Models.Feed;
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
                    .AddSingleton<IMapper<IMedicineType, MedicineType>, MedicineTypeMapper>()
                    .AddSingleton<IMapper<UnitModel, IUnit>, UnitMapper>()
                    .AddScoped<IAnimalCrudService, AnimalCrudService>()
                    .AddScoped<IAnimalSearchService, AnimalSearchService>()
                    .AddScoped<IFeedTypeSearchService, FeedTypeSearchService>()
                    .AddScoped<IFeedTypeCrudService, FeedTypeCrudService>()
                    .AddScoped<IFeedingTransactionCrudService, FeedingTransactionCrudService>()
                    .AddScoped<IMedicalTransactionCrudService, MedicalTransactionCrudService>()
                    .AddScoped<IMedicalTransactionSearchService, MedicalTransactionSearchService>()
                    .AddScoped<IMedicineTypeCrudService, MedicineTypeCrudService>()
                    .AddScoped<IMedicineTypeSearchService, MedicineTypeSearchService>()
                    .AddScoped<IUnitCrudService, UnitCrudService>()
                    .AddScoped<IWeightTransactionCrudService, WeightTransactionCrudService>();

            return services;
        }
    }
}
