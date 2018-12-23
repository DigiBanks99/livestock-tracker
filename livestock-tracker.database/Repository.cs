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

    public virtual TEntity Add(TEntity entity)
    {
      var entityEntry = DataTable.Add(entity);
      return entityEntry.Entity;
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

    public virtual IQueryable<TEntity> GetAll()
    {
      return DataTable.Select(x => x);
    }

    public virtual void Remove(int id)
    {
      var entity = Get(id);
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
      int key = entity.GetKey();
      TEntity savedEntity = Get(key);
      if (savedEntity == null)
        throw new EntityNotFoundException<TEntity>(key);
      _dbContext.Entry(savedEntity).CurrentValues.SetValues(entity);
    }

    public virtual void BeforeSavingChanges() { }

    public void SaveChanges()
    {
      _dbContext.SaveChanges();
    }

    public virtual void ChangesSaved() { }
  }
}
