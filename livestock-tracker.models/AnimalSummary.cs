using LivestockTracker.Abstractions.Enums;
using LivestockTracker.Abstractions.Models;
using System;

namespace LivestockTracker.Models
{
    public class AnimalSummary : IAnimalSummary
    {
        public int ID { get; set; }

        public int Number { get; set; }

        public AnimalType Type { get; set; }

        public string? Subspecies { get; set; }

        public bool Sold { get; set; }

        public bool Deceased { get; set; }

        public DateTimeOffset BirthDate { get; set; }
    }
}
