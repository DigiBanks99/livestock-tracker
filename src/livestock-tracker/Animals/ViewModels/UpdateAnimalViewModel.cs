namespace LivestockTracker.Animals.ViewModels;

/// <summary>
///     Represents the properties that can be updated when updating an animal.
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
public record UpdateAnimalViewModel(long Id,
    AnimalType Type,
    string? Subspecies,
    DateTime BirthDate,
    DateTimeOffset PurchaseDate,
    decimal PurchasePrice,
    decimal ArrivalWeight,
    int BatchNumber,
    int Number)
{
    internal Animal ToAnimal()
    {
        return new(Type,
            Subspecies,
            Number,
            BatchNumber,
            BirthDate,
            PurchaseDate,
            PurchasePrice,
            ArrivalWeight);
    }
}
