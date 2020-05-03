using LivestockTracker.Abstractions.Models.Medical;

namespace LivestockTracker.Abstractions.Services.Medicine
{
    /// <summary>
    /// Provides create, read and update and deletion services for medical transactions.
    /// </summary>
    public interface IMedicalTransactionCrudService : ICrudAsyncService<IMedicalTransaction, int>
    {
    }
}
