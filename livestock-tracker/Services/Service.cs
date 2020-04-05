using LivestockTracker.Abstractions;
using LivestockTracker.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Services
{
    public class Service<TEntity, TKeyType> : IService<TEntity, TKeyType> where TEntity : class, IEntity<TKeyType>
                                                                          where TKeyType : struct
    {
        public Service(LivestockContext context)
        {
            Context = context;
        }

        public LivestockContext Context { get; }

        public virtual TEntity Add(TEntity entity)
        {
            var changes = Context.Set<TEntity>()
                                 .Add(entity);
            Context.SaveChanges();
            return changes.Entity;
        }

        public virtual TEntity Find(TKeyType id)
        {
            return Context.Set<TEntity>()
                          .Find(id);
        }

        public virtual async Task<TEntity> FindAsync(TKeyType id, CancellationToken cancellationToken)
        {
            return await Context.Set<TEntity>()
                                .FindAsync(new object[] { id }, cancellationToken)
                                .ConfigureAwait(false);
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            return Context.Set<TEntity>()
                          .ToList();
        }

        public virtual async Task<IEnumerable<TEntity>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await Context.Set<TEntity>()
                                .ToListAsync(cancellationToken)
                                .ConfigureAwait(false);
        }

        public virtual void Remove(TEntity entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            Context.Set<TEntity>()
                   .Remove(entity);
            Context.SaveChanges();
        }

        public virtual void Remove(TKeyType id)
        {
            var item = Find(id);
            Remove(item);
        }

        public virtual TEntity Update(TEntity entity)
        {
            var changes = Context.Set<TEntity>()
                                 .Update(entity);
            return changes.Entity;
        }
    }
}
