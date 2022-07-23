using Microsoft.Extensions.DependencyInjection;

namespace LivestockTracker.Medicine;

/// <summary>
/// Extensions for registering Medicine Services in the <see cref="IServiceCollection"/>.
/// </summary>
public static class MedicineServiceCollectionExtensions
{
    /// <summary>
    /// Adds the services for Medicine operations.
    /// </summary>
    /// <param name="services">The DI collection.</param>
    /// <returns>The DI collection.</returns>
    public static IServiceCollection AddMedicineServices(this IServiceCollection services)
    {
        services.AddScoped<IMedicalTransactionCrudService, MedicalTransactionCrudService>()
            .AddScoped<IMedicalTransactionSearchService, MedicalTransactionSearchService>()
            .AddScoped<IMedicineTypeCrudService, MedicineTypeCrudService>()
            .AddScoped<IMedicineTypeSearchService, MedicineTypeSearchService>();
        return services;
    }
}
