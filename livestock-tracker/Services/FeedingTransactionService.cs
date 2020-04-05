using LivestockTracker.Abstractions;
using LivestockTracker.Database;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Services
{
    public class FeedingTransactionService : Service<FeedingTransactionModel, FeedingTransaction, int>, IFeedingTransactionService
    {
        public FeedingTransactionService(LivestockContext context, IMapper<FeedingTransactionModel, FeedingTransaction> mapper)
            : base(context, mapper) { }

        public IEnumerable<FeedingTransaction> GetByAnimalId(int animalID)
        {
            return Context.FeedingTransactions
                          .Where(transaction => transaction.AnimalID == animalID)
                          .Select(transaction => Mapper.Map(transaction))
                          .ToList();
        }

        public async ValueTask<IEnumerable<FeedingTransaction>> GetByAnimalIdAsync(int animalID, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            return await Context.FeedingTransactions
                                .Where(transaction => transaction.AnimalID == animalID)
                                .Select(transaction => Mapper.Map(transaction))
                                .ToListAsync(cancellationToken)
                                .ConfigureAwait(false);
        }
    }
}
