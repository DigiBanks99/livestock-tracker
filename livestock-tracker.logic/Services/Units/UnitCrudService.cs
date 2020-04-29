using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Models.Units;
using LivestockTracker.Abstractions.Services.Units;
using LivestockTracker.Database;
using LivestockTracker.Database.Models;
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

namespace LivestockTracker.Logic.Services.Units
{
    /// <summary>
    /// Provides create, read, update, delete and paginated find services for units.
    /// </summary>
    internal class UnitCrudService : IUnitCrudService
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="mapper">The mapper.</param>
        /// <param name="livestockContext">The <see cref="DbContext"/> that contains the units.</param>
        public UnitCrudService(ILogger<UnitCrudService> logger, IMapper<UnitModel, IUnit> mapper, LivestockContext livestockContext)
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
        protected IMapper<UnitModel, IUnit> Mapper { get; }

        /// <summary>
        /// The <see cref="DbContext"/> that contains the units.
        /// </summary>
        protected LivestockContext LivestockContext { get; }

        /// <summary>
        /// Attempts to add a unit to the database context.
        /// </summary>
        /// <param name="item">The object that contains the information for the new unit.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The added unit.</returns>
        public virtual async Task<IUnit> AddAsync(IUnit item, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Adding a unit with detail {item}...");

            var entity = Mapper.Map(item);
            var changes = await LivestockContext.Units.AddAsync(entity, cancellationToken).ConfigureAwait(false);
            await LivestockContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

            Logger.LogDebug($"Unit added with detail {item}...");

            return Mapper.Map(changes.Entity);
        }

        /// <summary>
        /// Finds a collection of units that match a certain criteria, sorted by the sorting criteria.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property used for sorting.</typeparam>
        /// <param name="filter">The filter predicate which specifies the conditions to include a unit.</param>
        /// <param name="sort">The criteria for sorting.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>A collection of units sorted as specified and filtered by the given criteria.</returns>
        public virtual async Task<IEnumerable<IUnit>> FindAsync<TSortProperty>(Expression<Func<IUnit, bool>> filter,
                                                                               Expression<Func<IUnit, TSortProperty>> sort,
                                                                               ListSortDirection sortDirection,
                                                                               CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            Logger.LogInformation("Finding units...");

            return await LivestockContext.Units
                                         .ConstrainedFind(filter, sort, sortDirection)
                                         .Select(unit => Mapper.Map(unit))
                                         .Select(unit => Mapper.Map(unit))
                                         .ToListAsync(cancellationToken)
                                         .ConfigureAwait(false);
        }

        /// <summary>
        /// Finds a paged collection of units that match a certain criteria, sorted by the sorting criteria.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property used for sorting.</typeparam>
        /// <param name="filter">The filter predicate which specifies the conditions to include a unit.</param>
        /// <param name="sort">The criteria for sorting.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="pagingOptions">The options for pagination.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>A paged collection of units sorted as specified and filtered by the given criteria.</returns>
        public virtual async Task<IPagedData<IUnit>> FindAsync<TSortProperty>(Expression<Func<IUnit, bool>> filter,
                                                                              Expression<Func<IUnit, TSortProperty>> sort,
                                                                              ListSortDirection sortDirection,
                                                                              IPagingOptions pagingOptions,
                                                                              CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            Logger.LogInformation("Finding units...");

            var data = await LivestockContext.Units
                                             .ConstrainedFind(filter, sort, sortDirection, pagingOptions)
                                             .Select(unit => Mapper.Map(unit))
                                             .Select(unit => Mapper.Map(unit))
                                             .ToListAsync(cancellationToken)
                                             .ConfigureAwait(false);

            Logger.LogDebug("Counting units...");
            var totalRecords = await LivestockContext.Units.CountAsync(filter).ConfigureAwait(false);

            Logger.LogDebug($"Creating paginated results with {data}, {totalRecords}, {pagingOptions}...");
            return new PagedData<IUnit>(data, pagingOptions.PageSize, pagingOptions.PageNumber, totalRecords);
        }

        /// <summary>
        /// Finds a paged collection of units sorted by the sorting criteria.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property used for sorting.</typeparam>
        /// <param name="sort">The criteria for sorting.</param>
        /// <param name="sortDirection">Should the list be sorted ascending or descending.</param>
        /// <param name="pagingOptions">The options for pagination.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>A paged collection of units sorted as specified.</returns>
        public virtual Task<IPagedData<IUnit>> FindAsync<TSortProperty>(Expression<Func<IUnit, TSortProperty>> sort, ListSortDirection sortDirection, IPagingOptions pagingOptions, CancellationToken cancellationToken) where TSortProperty : IComparable
        {
            return FindAsync(_ => true, sort, sortDirection, pagingOptions, cancellationToken);
        }

        /// <summary>
        /// Finds a unit with the given ID.
        /// </summary>
        /// <param name="key">The unique identifier value for the unit.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The matching unit if found.</returns>
        public virtual async Task<IUnit?> GetOneAsync(int key, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Finding a unit that matches ID {key}...");
            var unit = await LivestockContext.Units
                                             .FindAsync(new object[] { key }, cancellationToken)
                                             .ConfigureAwait(false);

            Logger.LogDebug($"Find unit with ID {key} result: {unit}");
            return Mapper.Map(unit);
        }

        /// <summary>
        /// Removes a unit with the given ID.
        /// </summary>
        /// <param name="key">The unique identifier value for the unit.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The ID of the removed unit.</returns>
        public virtual async Task<int> RemoveAsync(int key, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Marking unit with ID {key} as deleted...");
            var unit = await LivestockContext.Units
                                             .FindAsync(new object[] { key }, cancellationToken)
                                             .ConfigureAwait(false);
            if (unit == null)
            {
                throw new EntityNotFoundException<IUnit>(key);
            }

            unit.Deleted = true;
            var changes = LivestockContext.Update(unit);
            await LivestockContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
            Logger.LogDebug($"Unit with ID {changes.Entity.Id} marked as deleted.");
            return changes.Entity.Id;
        }

        /// <summary>
        /// Updates a unit with the given values.
        /// </summary>
        /// <param name="item">The property values with which to update the unit.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The updated unit.</returns>
        public virtual async Task<IUnit> UpdateAsync(IUnit item, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Updating unit with ID {item.Id}...");
            var unit = await LivestockContext.Units
                                                           .FindAsync(new object[] { item.Id }, cancellationToken)
                                                           .ConfigureAwait(false);
            if (unit == null)
            {
                throw new EntityNotFoundException<IUnit>(item.Id);
            }

            UpdateEntityValues(unit, item);

            var changes = LivestockContext.Update(unit);
            await LivestockContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

            return Mapper.Map(changes.Entity);
        }

        /// <summary>
        /// Updates the unit entity instance with the values of the unit DTO instance.
        /// </summary>
        /// <param name="entity">The database entity instance of the unit.</param>
        /// <param name="dto">The DTO instance of the unit.</param>
        protected virtual void UpdateEntityValues(UnitModel entity, IUnit dto)
        {
            entity.Description = dto.Description;
        }
    }
}
