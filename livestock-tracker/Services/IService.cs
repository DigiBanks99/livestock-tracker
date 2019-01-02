using LivestockTracker.Database;
using System.Collections.Generic;

namespace LivestockTracker.Services
{
    public interface IService<TEntity> where TEntity : IEntity
    {
        TEntity Get(int id);
        IEnumerable<TEntity> GetAll();
        TEntity Add(TEntity entity);
        TEntity Update(TEntity entity);
        void Remove(TEntity entity);
        void Remove(int id);
        void Save();
    }
}
