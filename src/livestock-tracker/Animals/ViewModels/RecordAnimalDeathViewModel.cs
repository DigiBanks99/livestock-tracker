namespace LivestockTracker.Animals.ViewModels;

/// <summary>
///     Represents a request to record the death of an animal.
/// </summary>
/// <param name="AnimalId">The deceased animal identifier.</param>
/// <param name="DateOfDeath">The date and time of the animal's death.</param>
public record RecordAnimalDeathViewModel(long AnimalId, DateTimeOffset DateOfDeath);
