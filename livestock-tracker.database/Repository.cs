using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace LivestockTracker.Database
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class, IEntity
    {
        private readonly DbContext _dbContext;
        public Repository(DbContext context)
        {
            _dbContext = context;
            DataTable = context.Set<TEntity>();
        }

        protected DbSet<TEntity> DataTable { get; }

        public virtual void Add(TEntity entity)
        {
            DataTable.Add(entity);
        }

        public virtual void AddRange(IEnumerable<TEntity> entities)
        {
            DataTable.AddRange(entities);
        }

        public virtual IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return DataTable.Where(predicate);
        }

        public virtual TEntity Get(int id)
        {
            return DataTable.Find(id);
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            return DataTable.ToList();
        }

        public virtual void Remove(int id)
        {
            var entity = DataTable.Find(id);
            Remove(entity);
        }

        public virtual void RemoveRange(IEnumerable<TEntity> entities)
        {
            DataTable.RemoveRange(entities);
        }

        public virtual void Remove(TEntity entity)
        {
            DataTable.Remove(entity);
        }

        public virtual void Update(TEntity entity)
        {
            _dbContext.Entry(Get(entity.ID)).CurrentValues.SetValues(entity);
        }

        public virtual void BeforeSavingChanges() { }

        public void SaveChanges()
        {
            _dbContext.SaveChanges();
        }

        public virtual void ChangesSaved() { }
    }
}
