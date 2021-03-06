using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models.Animals;
using LivestockTracker.Abstractions.Models.Feed;
using LivestockTracker.Abstractions.Models.Medical;
using LivestockTracker.Abstractions.Models.Units;
using LivestockTracker.Abstractions.Services.Animals;
using LivestockTracker.Abstractions.Services.Feed;
using LivestockTracker.Abstractions.Services.Medical;
using LivestockTracker.Abstractions.Services.Units;
using LivestockTracker.Database.Models.Animals;
using LivestockTracker.Database.Models.Feed;
using LivestockTracker.Database.Models.Medical;
using LivestockTracker.Database.Models.Units;
using LivestockTracker.Logic.Mappers.Animals;
using LivestockTracker.Logic.Mappers.Feed;
using LivestockTracker.Logic.Mappers.Medical;
using LivestockTracker.Logic.Mappers.Units;
using LivestockTracker.Logic.Services.Animals;
using LivestockTracker.Logic.Services.Feed;
using LivestockTracker.Logic.Services.Medical;
using LivestockTracker.Logic.Services.Units;
using LivestockTracker.Models.Animals;
using LivestockTracker.Models.Feed;
using LivestockTracker.Models.Medical;
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
                    .AddSingleton<IMapper<IMedicalTransaction, MedicalTransaction>, MedicalTransactionMapper>()
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
                    .AddScoped<IUnitCrudService, UnitCrudService>();

            return services;
        }
    }
}
