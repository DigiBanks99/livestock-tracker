using LivestockTracker.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Services
{
  public class Service<TEntity> : IService<TEntity> where TEntity : class, IEntity
  {
    private readonly IRepository<TEntity> _repository;

    public Service(IRepository<TEntity> repository)
    {
      _repository = repository;
    }

    public TEntity Add(TEntity entity)
    {
      return _repository.Add(entity);
    }

    public TEntity Get(int id)
    {
      return _repository.Get(id);
    }

    public Task<TEntity> GetAsync(int id, CancellationToken cancellationToken)
    {
      return _repository.GetAsync(id, cancellationToken);
    }

    public IEnumerable<TEntity> GetAll()
    {
      return _repository.GetAll();
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync(CancellationToken cancellationToken)
    {
      return await _repository.GetAll().ToListAsync(cancellationToken).ConfigureAwait(false);
    }

    public void Remove(TEntity entity)
    {
      if (entity == null)
        throw new ArgumentNullException(nameof(entity));

      Remove(entity.GetKey());
    }

    public void Remove(int id)
    {
      _repository.Remove(id);
    }

    public void Save()
    {
      _repository.SaveChanges();
    }

    public TEntity Update(TEntity entity)
    {
      _repository.Update(entity);
      return _repository.Get(entity.GetKey());
    }
  }
}
