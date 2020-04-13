using LivestockTracker.Abstractions.Data;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Abstractions.Services
{
    /// <summary>
    /// An interface for interacting with data entities via DTO objects.
    /// </summary>
    /// <typeparam name="TEntity">The type of entity that is being interacted with.</typeparam>
    /// <typeparam name="TDto">The DTO representation of the entity.</typeparam>
    /// <typeparam name="TKeyType">The type of the key of the entity.</typeparam>
    [Obsolete("Building a new set of interfaces that will be better for this.")]
    public interface IService<TEntity, TDto, TKeyType>
        where TEntity : IEntity<TKeyType>
        where TDto : class
        where TKeyType : struct
    {
        /// <summary>
        /// Find the item via the key.
        /// </summary>
        /// <param name="id">The key that is being searched for.</param>
        /// <returns>A DTO representation of the entity if it was found.</returns>
        TDto? Find(TKeyType id);

        Task<TDto?> FindAsync(TKeyType id, CancellationToken cancellationToken);
        IEnumerable<TDto> GetAll();
        Task<IEnumerable<TDto>> GetAllAsync(CancellationToken cancellationToken);
        TDto Add(TDto dto);
        TDto Update(TDto dto);
        void Remove(TDto dto);
        void Remove(TKeyType id);
    }
}
