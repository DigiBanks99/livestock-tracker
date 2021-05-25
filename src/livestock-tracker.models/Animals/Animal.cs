using LivestockTracker.Abstractions.Enums;
using LivestockTracker.Abstractions.Models.Animals;
using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace LivestockTracker.Models.Animals
{
    [DebuggerDisplay("[{Id} - {Number}]: {BirthDate.ToString(\"o\")} - Sold: {Sold}, Deceased: {Deceased}")]
    public class Animal : IAnimal
    {
        public long Id { get; set; }
        [Required]
        public AnimalType Type { get; set; }
        [MaxLength(50)]
        public string? Subspecies { get; set; }
        [Required]
        public int Number { get; set; }
        [Required]
        public int BatchNumber { get; set; }
        [Required]
        public DateTimeOffset BirthDate { get; set; }
        [Required]
        public DateTimeOffset PurchaseDate { get; set; }
        [Required]
        public decimal PurchasePrice { get; set; }
        [Required]
        public decimal ArrivalWeight { get; set; }
        [Required]
        public bool Sold { get; set; } = false;
        public decimal? SellPrice { get; set; }
        public DateTimeOffset? SellDate { get; set; }
        [Required]
        public bool Deceased { get; set; } = false;
        public DateTimeOffset? DateOfDeath { get; set; }
    }
}
