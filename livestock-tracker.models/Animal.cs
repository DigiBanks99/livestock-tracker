using LivestockTracker.Database;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models
{
  public class Animal : IEntity
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

    public List<MedicalTransaction> MedicalTransactions { get; set; }
    public List<FeedingTransaction> FeedingTransactions { get; set; }
    public int GetKey()
    {
      return ID;
    }
  }
}
