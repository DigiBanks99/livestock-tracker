using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models.Medical;
using LivestockTracker.Abstractions.Services.Medical;
using LivestockTracker.Database;
using LivestockTracker.Database.Models.Medical;
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
    /// Provides create, read, update and delete operations for medicine types.
    /// </summary>
    internal class MedicineTypeCrudService : IMedicineTypeCrudService
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="mapper">The mapper.</param>
        /// <param name="livestockContext">The database context that contains the medicine types.</param>
        public MedicineTypeCrudService(ILogger<MedicineTypeCrudService> logger, IMapper<IMedicineType, MedicineType> mapper, LivestockContext livestockContext)
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
        protected IMapper<IMedicineType, MedicineType> Mapper { get; }

        /// <summary>
        /// The database context that contains the medicine types.
        /// </summary>
        protected LivestockContext LivestockContext { get; }

        /// <summary>
        /// Attempts to add a new medicine type to the persisted store.
        /// </summary>
        /// <param name="item">The medicine type that should be added.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The added medicine type.</returns>
        public virtual async Task<IMedicineType> AddAsync(IMedicineType item, CancellationToken cancellationToken)
        {
            Logger.LogInformation("Adding a medicine type...");

            var entity = new MedicineTypeModel
            {
                Description = item.Description
            };
            var changes = await LivestockContext.AddAsync(entity, cancellationToken)
                                                .ConfigureAwait(false);
            await LivestockContext.SaveChangesAsync(cancellationToken)
                                  .ConfigureAwait(false);

            Logger.LogDebug($"Medicine type added with detail {changes.Entity}");
            return Mapper.Map(changes.Entity);
        }

        /// <summary>
        /// Finds the medicine types that match a provided filter predicate from the persisted data store and sorts them as specified.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
        /// <param name="filter">The filter predicate which specifies the conditions to include a medicine type.</param>
        /// <param name="sort">The function that returns the sort property on the medicine type.</param>
        /// <param name="sortDirection">Either ascending or descending.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The enumerable collection of medicine types that match the criteria.</returns>
        public virtual async Task<IEnumerable<IMedicineType>> FindAsync<TSortProperty>(Expression<Func<IMedicineType, bool>> filter,
                                                                                       Expression<Func<IMedicineType, TSortProperty>> sort,
                                                                                       ListSortDirection sortDirection,
                                                                                       CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            Logger.LogInformation("Finding the medicine types...");
            return await LivestockContext.MedicineTypes
                                         .ConstrainedFind(filter, sort, sortDirection)
                                         .Select(medicineType => Mapper.Map(medicineType))
                                         .ToListAsync(cancellationToken)
                                         .ConfigureAwait(false);
        }

        /// <summary>
        /// Finds a medicine type that matches a given key.
        /// </summary>
        /// <param name="key">The medicine type's ID.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>
        ///     <list type="bullet">
        ///         <item>A medicine type if found.</item>
        ///         <item>Null if not found.</item>
        ///     </list>
        /// </returns>
        public virtual async Task<IMedicineType?> GetOneAsync(int key, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Finding a medicine type that matches ID {key}...");
            var medicineType = await LivestockContext.MedicineTypes
                                                     .FindAsync(new object[] { key }, cancellationToken)
                                                     .ConfigureAwait(false);

            Logger.LogDebug($"Find medicine type of ID {key} result: {medicineType}");
            return Mapper.Map(medicineType);
        }

        /// <summary>
        /// Flags the record in the persisted store as Deleted. It does not physically delete the record
        /// to ensure relationships for history items are kept intact.
        /// </summary>
        /// <param name="key">The ID for the medicine type.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The ID of the medicine type that was marked as Deleted.</returns>
        public virtual async Task<int> RemoveAsync(int key, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Marking the medicine type with ID {key} as deleted...");

            var entity = await LivestockContext.MedicineTypes
                                               .FindAsync(new object[] { key }, cancellationToken)
                                               .ConfigureAwait(false);
            if (entity == null)
                throw new EntityNotFoundException<MedicineTypeModel>(key);

            entity.Deleted = true;
            var changes = LivestockContext.Update(entity);
            await LivestockContext.SaveChangesAsync(cancellationToken)
                                  .ConfigureAwait(false);

            Logger.LogDebug($"Medicine type with ID {key} marked as deleted...");
            return changes.Entity.Id;
        }

        /// <summary>
        /// Updates the properties of an medicine type in the persisted store.
        /// </summary>
        /// <param name="item">The medicine type with its desired values.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The updated medicine type.</returns>
        /// <exception cref="EntityNotFoundException{IMedicineType}">When the medicine type with the given key is not found.</exception>
        public virtual async Task<IMedicineType> UpdateAsync(IMedicineType item, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Updating the medicine type with ID {item.Id}...");

            var entity = await LivestockContext.MedicineTypes
                                               .FindAsync(new object[] { item.Id }, cancellationToken)
                                               .ConfigureAwait(false);
            if (entity == null)
                throw new EntityNotFoundException<MedicineTypeModel>(item.Id);

            entity.Description = item.Description;

            var changes = LivestockContext.MedicineTypes.Update(entity);
            await LivestockContext.SaveChangesAsync(cancellationToken)
                                  .ConfigureAwait(false);

            return Mapper.Map(changes.Entity);
        }
    }
}
