using LivestockTracker.Models;
using System.Collections.Generic;

namespace LivestockTracker.Database
{
    public interface IAnimalRepository: IRepository<Animal>
    {
        IEnumerable<Animal> Animals { get; }
    }
}
