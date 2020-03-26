using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Database
{
  public interface IRepository<TEntity> where TEntity : IEntity
  {
    long Count();
    Task<long> CountAsync();
    IQueryable<TEntity> GetAll();
    IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);
    Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken);
    TEntity Get(int id);
    Task<TEntity> GetAsync(int id, CancellationToken cancellationToken);
    TEntity Add(TEntity entity);
    Task<TEntity> AddAsync(TEntity entity, CancellationToken cancellationToken);
    void AddRange(IEnumerable<TEntity> entities);
    Task<IEnumerable<TEntity>> AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken);
    void Update(TEntity entity);
    Task UpdateAsync(TEntity entity, CancellationToken cancellationToken);
    void Remove(int id);
    void Remove(TEntity entity);
    Task RemoveAsync(int id, CancellationToken cancellationToken);
    Task RemoveAsync(TEntity entity, CancellationToken cancellationToken);
    void RemoveRange(IEnumerable<TEntity> entities);
    Task RemoveRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken);
    void BeforeSavingChanges();
    void SaveChanges();
    void ChangesSaved();
  }
}
