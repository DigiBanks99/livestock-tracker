using LivestockTracker.Database;
using System.Collections.Generic;

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

    public IEnumerable<TEntity> GetAll()
    {
      return _repository.GetAll();
    }

    public void Remove(TEntity entity)
    {
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

    public void Update(TEntity entity)
    {
      _repository.Update(entity);
    }
  }
}
