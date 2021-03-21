using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Models.Medical;
using LivestockTracker.Abstractions.Services.Medical;
using LivestockTracker.Database;
using LivestockTracker.Database.Models.Medical;
using LivestockTracker.Models.Medical;
using LivestockTracker.Models.Paging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Logic.Services.Medical
{
    /// <summary>
    /// Provides create, read, update and delete services for medical transactions.
    /// </summary>
    public class MedicalTransactionCrudService : IMedicalTransactionCrudService
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="mapper">The mapper.</param>
        /// <param name="livestockContext">The database context that contains the medical transactions table.</param>
        public MedicalTransactionCrudService(ILogger<MedicalTransactionCrudService> logger,
                                             IMapper<IMedicalTransaction, MedicalTransaction> mapper,
                                             LivestockContext livestockContext)
        {
            Logger = logger;
            Mapper = mapper;
            LivestockContext = livestockContext;
        }

        /// <summary>
        /// The logger.
        /// </summary>
        protected ILogger Logger { get; }

        /// <summary>
        /// The mapper.
        /// </summary>
        protected IMapper<IMedicalTransaction, MedicalTransaction> Mapper { get; }

        /// <summary>
        /// The database context that contains the medical transactions table.
        /// </summary>
        protected LivestockContext LivestockContext { get; }

        /// <summary>
        /// Attempts to add a medical transaction to the database context.
        /// </summary>
        /// <param name="item">The object that contains the information for the new medical transaction.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The added medical transaction.</returns>
        public virtual async Task<IMedicalTransaction> AddAsync(IMedicalTransaction item, CancellationToken cancellationToken)
        {
            Logger.LogInformation("Adding a medical transaction...");

            var entity = new MedicalTransactionModel
            {
                AnimalId = item.AnimalId,
                Dose = item.Dose,
                MedicineId = item.MedicineId,
                TransactionDate = item.TransactionDate,
                UnitId = item.UnitId
            };

            var changes = await LivestockContext.MedicalTransactions.AddAsync(entity, cancellationToken)
                                                                    .ConfigureAwait(false);
            await LivestockContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

            return Mapper.Map(changes.Entity);
        }

        /// <summary>
        /// Finds a collection of medical transactions that match a certain criteria, sorted by the sorting criteria.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property used for sorting.</typeparam>
        /// <param name="filter">The filter predicate which specifies the conditions to include a medical transaction.</param>
        /// <param name="sort">The criteria for sorting.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>A collection of medical transactions sorted as specified and filtered by the given criteria.</returns>
        public virtual async Task<IEnumerable<IMedicalTransaction>> FindAsync<TSortProperty>(Expression<Func<IMedicalTransaction, bool>> filter,
                                                                                             Expression<Func<IMedicalTransaction, TSortProperty>> sort,
                                                                                             ListSortDirection sortDirection,
                                                                                             CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            Logger.LogInformation("Finding medical transactions...");

            return await LivestockContext.MedicalTransactions
                                         .ConstrainedFind(filter, sort, sortDirection)
                                         .Select(medicalTransaction => Mapper.Map(medicalTransaction))
                                         .Select(medicalTransaction => Mapper.Map(medicalTransaction))
                                         .ToListAsync(cancellationToken)
                                         .ConfigureAwait(false);
        }

        /// <summary>
        /// Finds a paged collection of medical transactions that match a certain criteria, sorted by the sorting criteria.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property used for sorting.</typeparam>
        /// <param name="filter">The filter predicate which specifies the conditions to include a medical transaction.</param>
        /// <param name="sort">The criteria for sorting.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="pagingOptions">The options for pagination.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>A paged collection of medical transactions sorted as specified and filtered by the given criteria.</returns>
        public virtual async Task<IPagedData<IMedicalTransaction>> FindAsync<TSortProperty>(Expression<Func<IMedicalTransaction, bool>> filter,
                                                                                            Expression<Func<IMedicalTransaction, TSortProperty>> sort,
                                                                                            ListSortDirection sortDirection,
                                                                                            IPagingOptions pagingOptions,
                                                                                            CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            Logger.LogInformation("Finding medical transactions...");

            var data = await LivestockContext.MedicalTransactions
                                         .ConstrainedFind(filter, sort, sortDirection, pagingOptions)
                                         .Select(medicalTransaction => Mapper.Map(medicalTransaction))
                                         .Select(medicalTransaction => Mapper.Map(medicalTransaction))
                                         .ToListAsync(cancellationToken)
                                         .ConfigureAwait(false);

            var totalRecords = await LivestockContext.MedicalTransactions.CountAsync(filter).ConfigureAwait(false);

            return new PagedData<IMedicalTransaction>(data, pagingOptions.PageSize, pagingOptions.PageNumber, totalRecords);
        }

        /// <summary>
        /// Finds a paged collection of medical transactions sorted by the sorting criteria.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property used for sorting.</typeparam>
        /// <param name="sort">The criteria for sorting.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="pagingOptions">The options for pagination.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>A paged collection of medical transactions sorted as specified.</returns>
        public virtual async Task<IPagedData<IMedicalTransaction>> FindAsync<TSortProperty>(Expression<Func<IMedicalTransaction, TSortProperty>> sort,
                                                                                            ListSortDirection sortDirection,
                                                                                            IPagingOptions pagingOptions,
                                                                                            CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            Logger.LogInformation("Finding medical transactions...");

            var data = await LivestockContext.MedicalTransactions
                                         .ConstrainedFind(_ => true, sort, sortDirection, pagingOptions)
                                         .Select(medicalTransaction => Mapper.Map(medicalTransaction))
                                         .Select(medicalTransaction => Mapper.Map(medicalTransaction))
                                         .ToListAsync(cancellationToken)
                                         .ConfigureAwait(false);

            var totalRecords = await LivestockContext.MedicalTransactions.CountAsync().ConfigureAwait(false);

            return new PagedData<IMedicalTransaction>(data, pagingOptions.PageSize, pagingOptions.PageNumber, totalRecords);
        }

        /// <summary>
        /// Finds a feed type with the given ID.
        /// </summary>
        /// <param name="key">The unique identifier value for the medical transaction.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The matching medical transaction if found.</returns>
        public virtual async Task<IMedicalTransaction?> GetOneAsync(long key, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Finding a medical transaction that matches ID {key}...");
            var medicalTransaction = await LivestockContext.MedicalTransactions
                                                           .FindAsync(new object[] { key }, cancellationToken)
                                                           .ConfigureAwait(false);

            Logger.LogDebug($"Find medical transaction with ID {key} result: {medicalTransaction}");
            return Mapper.Map(medicalTransaction);
        }

        /// <summary>
        /// Removes a medical transaction with the given ID.
        /// </summary>
        /// <param name="key">The unique identifier value for the medical transaction.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The ID of the removed medical transaction.</returns>
        public virtual async Task<long> RemoveAsync(long key, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Deleting medical transaction with ID {key}...");
            var medicalTransaction = await LivestockContext.MedicalTransactions
                                                           .FindAsync(new object[] { key }, cancellationToken)
                                                           .ConfigureAwait(false);
            if (medicalTransaction == null)
            {
                throw new EntityNotFoundException<IMedicalTransaction>(key);
            }

            var changes = LivestockContext.Remove(medicalTransaction);
            await LivestockContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
            Logger.LogDebug($"Deleted medical transaction with ID {changes.Entity.Id}.");
            return changes.Entity.Id;
        }

        /// <summary>
        /// Updates a medical transaction with the given values.
        /// </summary>
        /// <param name="item">The property values with which to update the medical transaction.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The updated medical transaction.</returns>
        public virtual async Task<IMedicalTransaction> UpdateAsync(IMedicalTransaction item, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Updating medical transaction with ID {item.Id}...");
            var medicalTransaction = await LivestockContext.MedicalTransactions
                                                           .FindAsync(new object[] { item.Id }, cancellationToken)
                                                           .ConfigureAwait(false);
            if (medicalTransaction == null)
            {
                throw new EntityNotFoundException<IMedicalTransaction>(item.Id);
            }

            UpdateEntityValues(medicalTransaction, item);

            var changes = LivestockContext.Update(medicalTransaction);
            await LivestockContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

            return Mapper.Map(changes.Entity);
        }

        /// <summary>
        /// Updates the medical transaction entity instance with the values of the medical transaction DTO instance.
        /// </summary>
        /// <param name="entity">The database entity instance of the medical transaction.</param>
        /// <param name="dto">The DTO instance of the medical transaction.</param>
        protected virtual void UpdateEntityValues(MedicalTransactionModel entity, IMedicalTransaction dto)
        {
            entity.MedicineId = dto.MedicineId;
            entity.Dose = dto.Dose;
            entity.TransactionDate = dto.TransactionDate;
            entity.UnitId = dto.UnitId;
        }
    }
}
