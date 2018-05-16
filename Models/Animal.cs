using System;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models
{
    public class Animal : IAnimal
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public int Type { get; set; }
        [MaxLength(50)]
        public string Subspecies { get; set; }
        [Required]
        public int Number { get; set; }
        [Required]
        public int BatchNumber { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
        [Required]
        public DateTime PurchaseDate { get; set; }
        [Required]
        public decimal PurchasePrice { get; set; }
        [Required]
        public decimal ArrivalWeight { get; set; }
        [Required]
        public bool Sold { get; set; } = false;
        public decimal? SellPrice { get; set; }
        public DateTime? SellDate { get; set; }
        [Required]
        public bool Deceased { get; set; } = false;
        public DateTime? DateOfDeath { get; set; }
    }
}
