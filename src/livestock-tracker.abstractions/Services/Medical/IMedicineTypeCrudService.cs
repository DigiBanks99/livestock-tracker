using System.Threading;
using System.Threading.Tasks;
using LivestockTracker.Abstractions.Services;

namespace LivestockTracker.Medicine;

/// <summary>
/// Provides create, read and update and deletion services for medicine types.
/// </summary>
public interface IMedicineTypeCrudService: ICrudAsyncService<IMedicineType, int>
{
    /// <summary>
    /// Adds a medicine type if it doesn't exist yet.
    /// </summary>
    /// <param name="medicineType">The request to create a medicine type.</param>
    /// <param name="cancellationToken">A token that can be used to cancel a request to create a medicine type.</param>
    /// <returns>The created medicine type.</returns>
    Task<MedicineType> AddAsync(MedicineType medicineType, CancellationToken cancellationToken);
}
