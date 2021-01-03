using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models.Animals;
using LivestockTracker.Abstractions.Services.Animals;
using LivestockTracker.Database;
using LivestockTracker.Database.Models.Animals;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Logic.Services.Animals
{
    /// <summary>
    /// Provides create, read, update and delete services for animals.
    /// </summary>
    public class AnimalCrudService : IAnimalCrudService
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="livestockContext">The database context that contains the animal entity.</param>
        /// <param name="animalMapper">A mapper between the animal entity and the animal DTO model.</param>
        public AnimalCrudService(ILogger<AnimalCrudService> logger, LivestockContext livestockContext, IMapper<AnimalModel, IAnimal> animalMapper)
        {
            Logger = logger;
            LivestockContext = livestockContext;
            AnimalMapper = animalMapper;
        }

        /// <summary>
        /// The logger instance.
        /// </summary>
        protected ILogger Logger { get; }

        /// <summary>
        /// The database context that contains the animal entity.
        /// </summary>
        protected LivestockContext LivestockContext { get; }

        /// <summary>
        /// A mapper between the animal entity and the animal DTO model.
        /// </summary>
        protected IMapper<AnimalModel, IAnimal> AnimalMapper { get; }

        /// <summary>
        /// Adds an animal to the persisted store.
        /// </summary>
        /// <param name="item">The animal to be added.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The added animal.</returns>
        public virtual async Task<IAnimal> AddAsync(IAnimal item, CancellationToken cancellationToken)
        {
            Logger.LogInformation("Adding an animal...");

            var entity = AnimalMapper.Map(item);
            var changes = await LivestockContext.AddAsync(entity, cancellationToken)
                                                .ConfigureAwait(false);
            await LivestockContext.SaveChangesAsync(cancellationToken)
                                  .ConfigureAwait(false);

            return AnimalMapper.Map(changes.Entity);
        }

        /// <summary>
        /// Finds the animal in the persisted store based on the provided predicate and sorting options.
        /// </summary>
        /// <typeparam name="TSortProperty">The type of the property on the object that is the sort key.</typeparam>
        /// <param name="filter">The filter predicate which specifies the conditions to include an animal.</param>
        /// <param name="sort">The function that returns the sort property on the animal.</param>
        /// <param name="sortDirection">Either ascending or descending.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The enumerable collection of animals that match the criteria.</returns>
        public virtual async Task<IEnumerable<IAnimal>> FindAsync<TSortProperty>(Expression<Func<IAnimal, bool>> filter,
                                                                                 Expression<Func<IAnimal, TSortProperty>> sort,
                                                                                 ListSortDirection sortDirection,
                                                                                 CancellationToken cancellationToken)
            where TSortProperty : IComparable
        {
            Logger.LogInformation("Finding animals...");
            var query = LivestockContext.Animals
                                        .Where(filter);

            var orderedQuery = sortDirection == ListSortDirection.Ascending ?
                query.OrderBy(sort) :
                query.OrderByDescending(sort);

            return await orderedQuery.Select(animal => animal as AnimalModel)
                                     .Select(entity => AnimalMapper.Map(entity))
                                     .ToListAsync(cancellationToken)
                                     .ConfigureAwait(false);
        }

        /// <summary>
        /// Retrieves the animal with an ID that matches the key value.
        /// </summary>
        /// <param name="key">The identifying value of the animal.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The animal if it was found.</returns>
        public virtual async Task<IAnimal?> GetOneAsync(int key, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Retrieving the animal with ID {key}...");

            var entity = await LivestockContext.Animals.FindAsync(new object[] { key }, cancellationToken)
                                                      .ConfigureAwait(false);
            return AnimalMapper.Map(entity);
        }

        /// <summary>
        /// Removes the animal with an ID that matches the key value from the persisted store.
        /// </summary>
        /// <param name="key">The identifying value of the animal.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The ID of the animal that was removed.</returns>
        /// <exception cref="EntityNotFoundException{AnimalModel}">When the animal with the given key is not found.</exception>
        public virtual async Task<int> RemoveAsync(int key, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Removing the animal with ID {key}...");

            var entity = await LivestockContext.Animals.FindAsync(new object[] { key }, cancellationToken)
                                                      .ConfigureAwait(false);
            if (entity == null)
                throw new EntityNotFoundException<AnimalModel>(key);

            var changes = LivestockContext.Animals.Remove(entity);
            await LivestockContext.SaveChangesAsync(cancellationToken)
                                  .ConfigureAwait(false);

            return changes.Entity.Id;
        }

        /// <summary>
        /// Updates the properties of an animal in the persisted store.
        /// </summary>
        /// <param name="item">The animal with its desired values.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The updated animal.</returns>
        /// <exception cref="EntityNotFoundException{AnimalModel}">When the animal with the given key is not found.</exception>
        public virtual async Task<IAnimal> UpdateAsync(IAnimal item, CancellationToken cancellationToken)
        {
            Logger.LogInformation($"Updating the animal with ID {item.Id}...");

            var entity = await LivestockContext.Animals.FindAsync(new object[] { item.Id }, cancellationToken)
                                                      .ConfigureAwait(false);
            if (entity == null)
                throw new EntityNotFoundException<AnimalModel>(item.Id);

            UpdateEntityValues(entity, item);

            var changes = LivestockContext.Animals.Update(entity);
            await LivestockContext.SaveChangesAsync(cancellationToken)
                                  .ConfigureAwait(false);

            return AnimalMapper.Map(changes.Entity);
        }

        /// <summary>
        /// Updates the animal entity instance with the values of the animal DTO instance.
        /// </summary>
        /// <param name="entity">The database entity instance of the animal.</param>
        /// <param name="dto">The DTO instance of the animal.</param>
        protected virtual void UpdateEntityValues(AnimalModel entity, IAnimal dto)
        {
            entity.ArrivalWeight = dto.ArrivalWeight;
            entity.BatchNumber = dto.BatchNumber;
            entity.BirthDate = dto.BirthDate;
            entity.DateOfDeath = dto.DateOfDeath;
            entity.Deceased = dto.Deceased;
            entity.Number = dto.Number;
            entity.PurchaseDate = dto.PurchaseDate;
            entity.PurchasePrice = dto.PurchasePrice;
            entity.SellDate = dto.SellDate;
            entity.SellPrice = dto.SellPrice;
            entity.Sold = dto.Sold;
            entity.Subspecies = dto.Subspecies;
            entity.Type = dto.Type;
        }
    }
}
