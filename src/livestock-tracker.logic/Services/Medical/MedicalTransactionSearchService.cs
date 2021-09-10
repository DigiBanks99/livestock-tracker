using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Models.Medical;
using LivestockTracker.Abstractions.Services.Medical;
using LivestockTracker.Database;
using LivestockTracker.Logic.Utilities;
using LivestockTracker.Models.Medical;
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
    /// Provides fetch and pagination services for medical transaction.
    /// </summary>
    public class MedicalTransactionSearchService : IMedicalTransactionSearchService
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        ///<param name="logger">The logger.</param>
        ///<param name="mapper">The mapper.</param>
        ///<param name="livestockContext">The context that contains medical transaction.</param>
        public MedicalTransactionSearchService(ILogger<MedicalTransactionSearchService> logger, IMapper<IMedicalTransaction, MedicalTransaction> mapper, LivestockContext livestockContext)
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
        /// The context that contains medical transaction.
        /// </summary>
        protected LivestockContext LivestockContext { get; }

        /// <summary>
        /// Finds the medical transaction that match the filter condition sorted as specified.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
        /// <param name="filter">The condition that filters the medical transaction that need to be included.</param>
        /// <param name="sort">The condition that defines the sorting property.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="pagingOptions">The options for pagination.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The sorted list of medical transaction that match the filter.</returns>
        public virtual async Task<IPagedData<IMedicalTransaction>> FindAsync<TSortProperty>(Expression<Func<IMedicalTransaction, bool>> filter,
                                                                                      Expression<Func<IMedicalTransaction, TSortProperty>> sort,
                                                                                      ListSortDirection sortDirection,
                                                                                      IPagingOptions pagingOptions,
                                                                                      CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            Logger.LogInformation($"Finding {pagingOptions.PageSize} medical transaction for page {pagingOptions.PageNumber}...");
            var paginatedResults = await PaginationUtility.FindAsync(LivestockContext.MedicalTransactions,
                                                                     Mapper,
                                                                     filter,
                                                                     sort,
                                                                     sortDirection,
                                                                     pagingOptions,
                                                                     cancellationToken)
                                                          .ConfigureAwait(false);
            Logger.LogDebug($"Found paged medical transaction: {paginatedResults}");
            return paginatedResults;
        }

        /// <summary>
        /// Finds the medical transaction sorted as specified.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
        /// <param name="sort">The condition that defines the sorting property.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="pagingOptions">The options for pagination.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The sorted list of medical transaction.</returns>
        public virtual Task<IPagedData<IMedicalTransaction>> FindAsync<TSortProperty>(Expression<Func<IMedicalTransaction, TSortProperty>> sort,
                                                                                ListSortDirection sortDirection,
                                                                                IPagingOptions pagingOptions,
                                                                                CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            return FindAsync(_ => true, sort, sortDirection, pagingOptions, cancellationToken);
        }

        /// <summary>
        /// Finds the medical transaction that match the filter condition sorted as specified.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
        /// <param name="filter">The condition that filters the medical transaction that need to be included.</param>
        /// <param name="sort">The condition that defines the sorting property.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The sorted list of medicine that match the filter.</returns>
        public virtual async Task<IEnumerable<IMedicalTransaction>> FindAsync<TSortProperty>(Expression<Func<IMedicalTransaction, bool>> filter,
                                                                                       Expression<Func<IMedicalTransaction, TSortProperty>> sort,
                                                                                       ListSortDirection sortDirection,
                                                                                       CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            Logger.LogInformation($"Finding medical transaction...");
            return await LivestockContext.MedicalTransactions
                                         .ConstrainedFind(filter, sort, sortDirection)
                                         .Select(medicineType => Mapper.Map(medicineType))
                                         .ToListAsync(cancellationToken)
                                         .ConfigureAwait(false);
        }

        /// <summary>
        /// Finds a medical transaction that matches a given key.
        /// </summary>
        /// <param name="key">The medical transaction's ID.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>
        ///     <list type="bullet">
        ///         <item>A medical transaction if found.</item>
        ///         <item>Null if not found.</item>
        ///     </list>
        /// </returns>
        public virtual async Task<IMedicalTransaction?> GetOneAsync(long key, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Finding a medical transaction that matches ID {key}...");
            var medicineType = await LivestockContext.MedicalTransactions
                                                     .FindAsync(new object[] { key }, cancellationToken)
                                                     .ConfigureAwait(false);

            Logger.LogDebug($"Find medical transaction of ID {key} result: {medicineType}");
            return Mapper.Map(medicineType);
        }
    }
}
