using LivestockTracker.Abstractions.Enums;
using System;
using System.Diagnostics;

namespace LivestockTracker.Animals
{
    /// <summary>
    /// A summary of an animal.
    /// </summary>
    [DebuggerDisplay("[{Id} - {Number}]{Archived ? \" A\" : string.Empty}: {BirthDate.ToString(\"o\")} - Sold: {Sold}, Deceased: {Deceased}")]
    public class AnimalSummary : IAnimalSummary
    {
        /// <summary>
        /// The unique identifier of the animal
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// The human readable animal number.
        /// </summary>
        public int Number { get; set; }

        /// <summary>
        /// The type of animal.
        /// </summary>
        public AnimalType Type { get; set; }

        /// <summary>
        /// The sub species of the animal.
        /// </summary>
        public string? Subspecies { get; set; }

        /// <summary>
        /// Whether the animal has been sold.
        /// </summary>
        public bool Sold { get; set; }

        /// <summary>
        /// Whether the animal is deceased.
        /// </summary>
        public bool Deceased { get; set; }

        /// <summary>
        /// The date the animal was born.
        /// </summary>
        public DateTimeOffset BirthDate { get; set; }

        /// <summary>
        /// Whether the animal has been archived.
        /// </summary>
        public bool Archived { get; set; }
    }
}
