namespace LivestockTracker.Animals.ViewModels;

/// <summary>
///     Represents a request to sell an animal.
/// </summary>
/// <param name="AnimalId">The unique identifier of the animal that was sold.</param>
/// <param name="SellPrice">The price the animal was sold for.</param>
/// <param name="SellDate">The date the animal was sold.</param>
public record SellAnimalRequestViewModel(long AnimalId, decimal SellPrice, DateTimeOffset SellDate);
