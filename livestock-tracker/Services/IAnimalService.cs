using LivestockTracker.Abstractions;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public interface IAnimalService : IService<Animal, int>
    {
    }
}
