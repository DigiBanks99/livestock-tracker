using LivestockTracker.Database;
using LivestockTracker.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Services
{
    public class FeedingTransactionService : Service<FeedingTransaction, int>, IFeedingTransactionService
    {
        public FeedingTransactionService(LivestockContext context) : base(context) { }

        public IEnumerable<FeedingTransaction> GetByAnimalId(int animalID)
        {
            return Context.FeedingTransactions
                          .Where(medical => medical.AnimalID == animalID)
                          .ToList();
        }

        public async ValueTask<IEnumerable<FeedingTransaction>> GetByAnimalIdAsync(int animalID, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            return await Context.FeedingTransactions
                                .Where(medical => medical.AnimalID == animalID)
                                .ToListAsync(cancellationToken)
                                .ConfigureAwait(false);
        }
    }
}
