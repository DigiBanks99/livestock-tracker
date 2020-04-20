using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Services;
using LivestockTracker.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Services
{
    /// <summary>
    /// <strong>DEPRECATED</strong>: General service for entity interactions.
    /// </summary>
    /// <typeparam name="TEntity">The type of entity.</typeparam>
    /// <typeparam name="TDto">The DTO model for the entity.</typeparam>
    /// <typeparam name="TKeyType">The primary key type for the entity.</typeparam>
    /// <seealso cref="IFetchService{TDto, TKey}"/>
    /// <seealso cref="IFetchAsyncService{TData, TKey}"/>
    /// <seealso cref="IPagedFetchAsyncService{TData}"/>
    /// <seealso cref="IPagedFetchService{TData}"/>
    /// <seealso cref="ICrudService{TDto, TKey}"/>
    /// <seealso cref="ICrudAsyncService{TDto, TKey}"/>
    [Obsolete("This has been replaced by a number of smaller services.")]
    public abstract class Service<TEntity, TDto, TKeyType>
        : IService<TEntity, TDto, TKeyType>
        where TEntity : class, IEntity<TKeyType>
        where TDto : class
        where TKeyType : struct
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="context">The database context that contains the entity.</param>
        /// <param name="mapper">A mapper between the entity and the DTO model.</param>
        protected Service(LivestockContext context, IMapper<TEntity, TDto> mapper)
        {
            Context = context;
            Mapper = mapper;
        }

        protected LivestockContext Context { get; }
        protected IMapper<TEntity, TDto> Mapper { get; }

        public virtual TDto Add(TDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

            var entity = Mapper.Map(dto);
            var changes = Context.Set<TEntity>()
                                 .Add(entity);
            Context.SaveChanges();

            return Mapper.Map(changes.Entity);
        }

        public virtual TDto? Find(TKeyType id)
        {
            var item = Context.Set<TEntity>()
                              .Find(id);

            return Mapper.Map(item);
        }

        public virtual async Task<TDto?> FindAsync(TKeyType id, CancellationToken cancellationToken)
        {
            var item = await Context.Set<TEntity>()
                                    .FindAsync(new object[] { id }, cancellationToken)
                                    .ConfigureAwait(false);

            return Mapper.Map(item);
        }

        public virtual IEnumerable<TDto> GetAll()
        {
            var entities = Context.Set<TEntity>()
                               .ToList();

            return entities.Select(entity => Mapper.Map(entity));
        }

        public virtual async Task<IEnumerable<TDto>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await Context.Set<TEntity>()
                                .Select(entity => Mapper.Map(entity))
                                .ToListAsync(cancellationToken)
                                .ConfigureAwait(false);
        }

        public virtual void Remove(TDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

            var entity = Mapper.Map(dto);
            Context.Set<TEntity>()
                   .Remove(entity);
            Context.SaveChanges();
        }

        public virtual void Remove(TKeyType id)
        {
            var item = Context.Set<TEntity>()
                              .Find(id);
            if (item != null)
            {
                Context.Set<TEntity>()
                       .Remove(item);
            }
        }

        public virtual TDto Update(TDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

            var entity = Mapper.Map(dto);
            var changes = Context.Set<TEntity>()
                                 .Update(entity);
            return Mapper.Map(changes.Entity);
        }
    }
}
