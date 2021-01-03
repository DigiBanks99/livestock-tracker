using LivestockTracker.Abstractions.Data;
using LivestockTracker.Abstractions.Enums;
using LivestockTracker.Abstractions.Models.Animals;
using LivestockTracker.Database.Models.Feed;
using LivestockTracker.Database.Models.Medical;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;

namespace LivestockTracker.Database.Models.Animals
{
    [DebuggerDisplay("[{Id} - {Number}]: {BirthDate.ToString(\"o\")} - Sold: {Sold}, Deceased: {Deceased}")]
    [Table("Animals", Schema = "animal")]
    public class AnimalModel : IEntity<int>, IAnimal
    {
        [Column("ID")]
        [Key]
        public int Id { get; set; }
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

        public List<MedicalTransactionModel> MedicalTransactions { get; set; } = new List<MedicalTransactionModel>();
        public List<FeedingTransactionModel> FeedingTransactions { get; } = new List<FeedingTransactionModel>();

        public int GetKey()
        {
            return Id;
        }
    }
}
