using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace LivestockTracker.Database
{
    public interface IRepository<TEntity> where TEntity : IEntity
    {
        IQueryable<TEntity> GetAll();
        IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);
        TEntity Get(int id);
        TEntity Add(TEntity entity);
        void AddRange(IEnumerable<TEntity> entities);
        void Update(TEntity entity);
        void Remove(int id);
        void Remove(TEntity entity);
        void RemoveRange(IEnumerable<TEntity> entities);
        void BeforeSavingChanges();
        void SaveChanges();
        void ChangesSaved();
    }
}
