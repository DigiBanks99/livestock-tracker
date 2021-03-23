using LivestockTracker.Abstractions.Models.Medical;

namespace LivestockTracker.Abstractions.Services.Medical
{
    /// <summary>
    /// / Provides fetch and pagination services for medical transactions.
    /// </summary>
    public interface IMedicalTransactionSearchService : IPagedFetchAsyncService<IMedicalTransaction>, IFetchAsyncService<IMedicalTransaction, long>
    {
    }
}
