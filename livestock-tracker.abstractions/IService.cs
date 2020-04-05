using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Abstractions
{
    public interface IService<TEntity, TKeyType> where TEntity : IEntity<TKeyType>
                                                 where TKeyType : struct
    {
        TEntity Find(TKeyType id);
        Task<TEntity> FindAsync(TKeyType id, CancellationToken cancellationToken);
        IEnumerable<TEntity> GetAll();
        Task<IEnumerable<TEntity>> GetAllAsync(CancellationToken cancellationToken);
        TEntity Add(TEntity entity);
        TEntity Update(TEntity entity);
        void Remove(TEntity entity);
        void Remove(TKeyType id);
    }
}
