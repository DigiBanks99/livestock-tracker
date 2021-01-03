using System;

namespace LivestockTracker.Abstractions.Models.Animals
{
    /// <summary>
    /// Defines all the properties about an animal.
    /// </summary>
    public interface IAnimal : IAnimalSummary
    {
        /// <summary>
        /// The number that uniquely identifies the batch the animal was procured in.
        /// </summary>
        int BatchNumber { get; }

        /// <summary>
        /// The date the animal was purchased.
        /// </summary>
        DateTimeOffset PurchaseDate { get; }

        /// <summary>
        /// The amount the animal was purchased for.
        /// </summary>
        decimal PurchasePrice { get; }

        /// <summary>
        /// The weight of the animal the day it arrived.
        /// </summary>
        decimal ArrivalWeight { get; }

        /// <summary>
        /// The price the animal was sold for.
        /// </summary>
        decimal? SellPrice { get; }

        /// <summary>
        /// The date on which the animal was sold.
        /// </summary>
        DateTimeOffset? SellDate { get; }

        /// <summary>
        /// The date the animal died.
        /// </summary>
        DateTimeOffset? DateOfDeath { get; }
    }
}
