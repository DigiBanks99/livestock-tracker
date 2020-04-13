using LivestockTracker.Abstractions.Enums;
using System;

namespace LivestockTracker.Abstractions.Models
{
    /// <summary>
    /// Defines the most basic properties that define an individual animal.
    /// </summary>
    public interface IAnimalSummary
    {
        /// <summary>
        /// Uniquely identifies the animal.
        /// </summary>
        int ID { get; }

        /// <summary>
        /// The human readable number assigned to the animal.
        /// </summary>
        int Number { get; }

        /// <summary>
        /// The species of the animal.
        /// </summary>
        AnimalType Type { get; }

        /// <summary>
        /// The subspecies of animal given the species. <seealso cref="Type"/>
        /// </summary>
        string? Subspecies { get; }

        /// <summary>
        /// The date the animal was born on.
        /// </summary>
        DateTimeOffset BirthDate { get; }

        /// <summary>
        /// Indicates whether this animal is sold.
        /// </summary>
        bool Sold { get; }

        /// <summary>
        /// Indicates whether this animal is deceased.
        /// </summary>
        bool Deceased { get; }
    }
}
