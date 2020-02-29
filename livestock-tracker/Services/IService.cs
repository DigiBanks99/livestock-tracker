using LivestockTracker.Database;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Services
{
  public interface IService<TEntity> where TEntity : IEntity
  {
    TEntity Get(int id);
    Task<TEntity> GetAsync(int id, CancellationToken cancellationToken);
    IEnumerable<TEntity> GetAll();
    Task<IEnumerable<TEntity>> GetAllAsync(CancellationToken cancellationToken);
    TEntity Add(TEntity entity);
    TEntity Update(TEntity entity);
    void Remove(TEntity entity);
    void Remove(int id);
    void Save();
  }
}
