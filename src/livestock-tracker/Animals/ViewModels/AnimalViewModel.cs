namespace LivestockTracker.Animals.ViewModels;

/// <summary>
///     Represents the core information of an animal.
/// </summary>
/// <param name="Id">The unique identifier of the animal.</param>
/// <param name="Type">The type/species of animal.</param>
/// <param name="Subspecies">The sub-species of animal.</param>
/// <param name="BirthDate">The date the animal was born.</param>
/// <param name="PurchaseDate">The date and time the animal was purchased.</param>
/// <param name="PurchasePrice">The price the animal was purchased for.</param>
/// <param name="ArrivalWeight">The weight of the animal on arrival.</param>
/// <param name="BatchNumber">The batch to which this animal belongs.</param>
/// <param name="Number">The user defined number for the animal.</param>
/// <param name="Sold">An indicator if the animal was sold.</param>
/// <param name="SellPrice">The price the animal was sold for.</param>
/// <param name="SellDate">The date and time the animal was sold.</param>
/// <param name="Deceased">An indicator if the animal is deceased.</param>
/// <param name="DateOfDeath">The date and time the animal died.</param>
public record AnimalViewModel(long Id,
    AnimalType Type,
    string? Subspecies,
    int Number,
    int BatchNumber,
    DateTime BirthDate,
    DateTimeOffset PurchaseDate,
    decimal PurchasePrice,
    decimal ArrivalWeight,
    bool Sold,
    decimal? SellPrice,
    DateTimeOffset? SellDate,
    bool Deceased,
    DateTimeOffset? DateOfDeath);

internal static class AnimalViewModelExtensions
{
    internal static AnimalViewModel ToViewModel(this Animal animal)
    {
        return new(animal.Id,
            animal.Type,
            animal.Subspecies,
            animal.Number,
            animal.BatchNumber,
            animal.BirthDate.Date,
            animal.PurchaseDate,
            animal.PurchasePrice,
            animal.ArrivalWeight,
            animal.Sold,
            animal.SellPrice,
            animal.SellDate,
            animal.Deceased,
            animal.DateOfDeath);
    }
}
