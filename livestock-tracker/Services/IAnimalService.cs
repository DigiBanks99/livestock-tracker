using LivestockTracker.Abstractions.Services;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;
using System;

namespace LivestockTracker.Services
{
    /// <summary>
    /// <strong>DEPRECATED</strong>: A general service for animals.
    /// </summary>
    [Obsolete("Replaced by several smaller interfaces. Use IAnimalSearchService and IAnimalCrudService instead.")]
    public interface IAnimalService : IService<AnimalModel, Animal, int>
    {
    }
}
