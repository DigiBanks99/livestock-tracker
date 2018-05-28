using LivestockTracker.Models;
using System.Collections.Generic;

namespace LivestockTracker.Database
{
    public interface IAnimalRepository: IRepository<Animal>
    {
        IEnumerable<Animal> Animals { get; }
    }

    public class AnimalRepository : Repository<Animal>, IAnimalRepository
    {
        public AnimalRepository(LivestockContext livestockContext) : base(livestockContext) { }

        public IEnumerable<Animal> Animals
        {
            get
            {
                return DataTable;
            }
        }
    }
}
