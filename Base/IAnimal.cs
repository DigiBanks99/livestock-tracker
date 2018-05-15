using System;

namespace LivestockTracker
{
    public interface IAnimal
    {
        int ID { get; set; }
        int Type { get; set; }
        string Subspecies { get; set; }
        int Number { get; set; }
        int BatchNumber { get; set; }
        DateTime BirthDate { get; set; }
        DateTime PurchaseDate { get; set; }
        decimal PurchasePrice { get; set; }
        decimal ArrivalWeight { get; set; }
        bool Sold { get; set; }
        decimal? SellPrice { get; set; }
    }
}
