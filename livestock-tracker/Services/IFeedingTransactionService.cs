using LivestockTracker.Abstractions;
using LivestockTracker.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Services
{
    public interface IFeedingTransactionService : IService<FeedingTransaction, int>
    {
        IEnumerable<FeedingTransaction> GetByAnimalId(int animalID);
        ValueTask<IEnumerable<FeedingTransaction>> GetByAnimalIdAsync(int animalID, CancellationToken cancellationToken);
    }
}
