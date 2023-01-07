namespace LivestockTracker.Animals;

/// <summary>
///     Basic statistics for the Kraal in question
/// </summary>
public sealed class KraalStats
{
    /// <summary>
    ///     Creates a new instance of <see cref="KraalStats" />.
    /// </summary>
    /// <param name="animalCount">The total number of animals for the kraal.</param>
    /// <param name="averageWeight">The average weight of the kraal's animals.</param>
    /// <param name="averageAnimalCost">The average cost of animals in the kraal.</param>
    /// <param name="averageSellPrice">The average price animals are sold for from this kraal.</param>
    /// <param name="deathRate">
    ///     The death to life ratio of the animals in this kraal.
    ///     <remarks>Ranges from 0 to 1.</remarks>
    /// </param>
    public KraalStats(int animalCount,
        decimal averageWeight,
        decimal averageAnimalCost,
        decimal averageSellPrice,
        decimal deathRate)
    {
        AnimalCount = animalCount;
        AverageWeight = averageWeight;
        AverageAnimalCost = averageAnimalCost;
        AverageSellPrice = averageSellPrice;
        DeathRate = deathRate;
    }

    /// <summary>
    ///     The total number of animals for the kraal.
    /// </summary>
    public int AnimalCount { get; init; }

    /// <summary>
    ///     The average weight of the kraal's animals.
    /// </summary>
    public decimal AverageWeight { get; init; }

    /// <summary>
    ///     The average cost of animals in the kraal.
    /// </summary>
    public decimal AverageAnimalCost { get; init; }

    /// <summary>
    ///     The average price animals are sold for from this kraal.
    /// </summary>
    public decimal AverageSellPrice { get; init; }

    /// <summary>
    ///     The death to life ratio of the animals in this kraal.
    ///     <remarks>Ranges from 0 to 1.</remarks>
    /// </summary>
    public decimal DeathRate { get; init; }

    /// <summary>
    ///     The default instance of <see cref="KraalStats" />.
    /// </summary>
    public static KraalStats Null { get; } = new(0, 0, 0, 0, 0);
}
