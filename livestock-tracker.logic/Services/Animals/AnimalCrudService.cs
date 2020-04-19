using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Services.Animal;
using System;
using System.Collections.Generic;
using System.ComponentModel;
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
        /// Adds an animal to the persisted store.
        /// </summary>
        /// <param name="item">The animal to be added.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The added animal.</returns>
        public IAnimal AddAsync(IAnimal item, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Finds the animal in the persisted store based on the provided predicate and sorting options.
        /// </summary>
        /// <typeparam name="TSortProperty"></typeparam>
        /// <param name="filter">The filter predicate which specifies the conditions to include an animal.</param>
        /// <param name="sort">The function that returns the sort property on the animal.</param>
        /// <param name="sortDirection">Either ascending or descending.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The enumerable collection of animals that match the criteria.</returns>
        public Task<IEnumerable<IAnimal>> FindAsync<TSortProperty>(Expression<Func<IAnimal, bool>> filter, Expression<Func<IAnimal, TSortProperty>> sort, ListSortDirection sortDirection, CancellationToken cancellationToken) where TSortProperty : IConvertible
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Retrieves the animal with an ID that matches the key value.
        /// </summary>
        /// <param name="key">The identifying value of the animal.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The animal if it was found.</returns>
        public Task<IAnimal?> GetOneAsync(int key, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Removes the animal with an ID that matches the key value from the persisted store.
        /// </summary>
        /// <param name="key">The identifying value of the animal.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The ID of the animal that was removed.</returns>
        public int RemoveAsync(int key, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Updates the properties of an animal in the persisted store.
        /// </summary>
        /// <param name="item">The animal with its desired values.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The updated animal.</returns>
        public IAnimal UpdateAsync(IAnimal item, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
