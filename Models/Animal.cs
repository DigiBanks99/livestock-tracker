using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LivestockTracker.Models
{
    public class Animal : IAnimal
    {
        public int ID { get; set; }
        public int Type { get; set; }
        public string Subspecies { get; set; }
        public int Number { get; set; }
        public int BatchNumber { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime PurchaseDate { get; set; }
        public decimal PurchasePrice { get; set; }
        public decimal ArrivalWeight { get; set; }
        public bool Sold { get; set; }
        public decimal? SellPrice { get; set; }
    }
}
