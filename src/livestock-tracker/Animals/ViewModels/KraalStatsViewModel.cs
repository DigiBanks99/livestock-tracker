namespace LivestockTracker.Animals.ViewModels;

/// <summary>
///     Creates a new instance of <see cref="KraalStatsViewModel" />.
/// </summary>
/// <param name="AnimalCount">The total number of animals for the kraal.</param>
/// <param name="AverageWeight">The average weight of the kraal's animals.</param>
/// <param name="AverageAnimalCost">The average cost of animals in the kraal.</param>
/// <param name="AverageSellPrice">The average price animals are sold for from this kraal.</param>
/// <param name="DeathRate">
///     The death to life ratio of the animals in this kraal.
///     <remarks>Ranges from 0 to 1.</remarks>
/// </param>
public record KraalStatsViewModel(int AnimalCount,
    decimal AverageWeight,
    decimal AverageAnimalCost,
    decimal AverageSellPrice,
    decimal DeathRate)
{
    /// <summary>
    ///     Creates a new instance of <see cref="KraalStatsViewModel" /> from an instance of <see cref="KraalStats" />.
    /// </summary>
    /// <param name="stats">The source <see cref="KraalStats" />.</param>
    /// <returns>The mapped instance of <see cref="KraalStatsViewModel" />.</returns>
    public static KraalStatsViewModel Create(KraalStats stats)
    {
        return new(stats.AnimalCount,
            stats.AverageWeight,
            stats.AverageAnimalCost,
            stats.AverageSellPrice,
            stats.DeathRate);
    }
}
