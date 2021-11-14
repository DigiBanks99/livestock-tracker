using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LivestockTracker.Animals
{
    /// <summary>
    /// The ordering types for <see cref="AnimalSummary"/> items.
    /// </summary>
    public enum AnimalOrderType
    {
        /// <summary>
        /// Order by the <see cref="AnimalSummary.Number"/>.
        /// </summary>
        Number = 0,
        /// <summary>
        /// Order by the <see cref="AnimalSummary.Subspecies"/>.
        /// </summary>
        AnimalType = 1,
        /// <summary>
        /// Order by the <see cref="AnimalSummary.BirthDate"/>.
        /// </summary>
        BirthDate = 2,
        /// <summary>
        /// Order by the <see cref="IAnimal.PurchaseDate"/>
        /// </summary>
        PurchaseDate = 3,
        /// <summary>
        /// Order by the <see cref="IAnimal.DateOfDeath"/>
        /// </summary>
        DeathDate = 4
    }
}
