using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Models.Weight;
using LivestockTracker.Abstractions.Services.Weight;
using LivestockTracker.Database;
using LivestockTracker.Database.Models.Weight;
using LivestockTracker.Logic.Filters;
using LivestockTracker.Logic.Mappers.Weight;
using LivestockTracker.Logic.Paging;
using LivestockTracker.Logic.Sorting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.ComponentModel;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Logic.Services.Weight
{
    /// <summary>
    /// Implements the service endpoints required to create, read, update and delete a
    /// <see cref="WeightTransaction"/>.
    /// </summary>
    public class WeightTransactionCrudService : IWeightTransactionCrudService
    {
        private readonly ILogger _logger;
        private readonly LivestockContext _context;

        /// <summary>
        /// The constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="context">The context that contains the <see cref="WeightTransactionModel"/> items.</param>
        public WeightTransactionCrudService(ILogger<WeightTransactionCrudService> logger, LivestockContext context)
        {
            _logger = logger;
            _context = context;
        }

        /// <inheritdoc/>
        public async Task<WeightTransaction> AddAsync(WeightTransaction item, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Adding a new weight transaction for animal ({@AnimalId})", item.AnimalId);

            var transaction = new WeightTransactionModel
            {
                AnimalId = item.AnimalId,
                TransactionDate = item.TransactionDate,
                Weight = item.Weight
            };

            var changes = _context.WeightTransactions.Add(transaction);
            await _context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

            return changes.Entity.MapToWeightTransaction();
        }

        /// <inheritdoc/>
        public async Task<WeightTransaction?> GetOneAsync(long key, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Retrieving the weight transaction with Id: {@Id}", key);

            return await _context.WeightTransactions
                                 .MapToWeightTransaction()
                                 .AsNoTracking()
                                 .FirstOrDefaultAsync(t => t.Id == key, cancellationToken)
                                 .ConfigureAwait(false);
        }

        /// <inheritdoc/>
        public async Task<long> RemoveAsync(long key, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Removing the weight transaction ({@Id})", key);

            var transaction = await _context.WeightTransactions
                                            .FindAsync(new object[] { key }, cancellationToken)
                                            .ConfigureAwait(false);
            if (transaction == null)
            {
                throw new EntityNotFoundException<WeightTransactionModel>(key);
            }

            _context.Remove(transaction);
            await _context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
            return key;
        }

        /// <inheritdoc/>
        public async Task<WeightTransaction> UpdateAsync(WeightTransaction item, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Updating the weight transaction ({@Id}) for animal ({@AnimalId})", item.Id, item.AnimalId);

            var transaction = await _context.WeightTransactions
                                            .FindAsync(new object[] { item.Id }, cancellationToken)
                                            .ConfigureAwait(false);
            if (transaction == null)
            {
                throw new EntityNotFoundException<WeightTransactionModel>(item.Id);
            }

            transaction.SetValues(item);

            var changes = _context.Update(transaction);
            await _context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

            return changes.Entity.MapToWeightTransaction();
        }

        /// <inheritdoc/>
        public Task<IPagedData<WeightTransaction>> FetchPagedAsync(WeightTransactionFilter filter,
                                                                   IPagingOptions pagingOptions,
                                                                   ListSortDirection sortDirection,
                                                                   CancellationToken cancellationToken)
        {
            _logger.LogInformation("Fetching paged weight transactions according to a filter. {@Filter}, {@PagingOptions}, {@SortDirection}",
                                   filter,
                                   pagingOptions,
                                   sortDirection);

            return _context.WeightTransactions.AsNoTracking()
                                              .MapToWeightTransaction()
                                              .FilterOnObject(filter)
                                              .SortByCriteria(t => t.TransactionDate, sortDirection)
                                              .ToPagedDataAsync(pagingOptions);
        }
    }
}
