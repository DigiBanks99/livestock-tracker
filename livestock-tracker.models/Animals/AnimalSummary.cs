using LivestockTracker.Abstractions.Enums;
using LivestockTracker.Abstractions.Models.Animals;
using System;
using System.Diagnostics;

namespace LivestockTracker.Models.Animals
{
    [DebuggerDisplay("[{Id} - {Number}]: {BirthDate.ToString(\"o\")} - Sold: {Sold}, Deceased: {Deceased}")]
    public class AnimalSummary : IAnimalSummary
    {
        public int Id { get; set; }

        public int Number { get; set; }

        public AnimalType Type { get; set; }

        public string? Subspecies { get; set; }

        public bool Sold { get; set; }

        public bool Deceased { get; set; }

        public DateTimeOffset BirthDate { get; set; }
    }
}
