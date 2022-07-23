using LivestockTracker.Abstractions;
using LivestockTracker.Animals;

namespace LivestockTracker.Logic.Mappers.Animals;

/// <summary>
///     Provides mapping operations for animal summary items.
/// </summary>
public class AnimalSummaryMapper : IMapper<IAnimalSummary, AnimalSummary>
{
    /// <summary>
    ///     Effectively only returns the <paramref name="right" /> instance as it already
    ///     implements <see cref="IAnimalSummary" />.
    /// </summary>
    /// <param name="right">An instance of <see cref="AnimalSummary" />.</param>
    /// <returns>The item passed into <paramref name="right" />.</returns>
    public IAnimalSummary Map(AnimalSummary? right)
    {
        return right ?? new AnimalSummary();
    }

    /// <summary>
    ///     Maps the instance passed in to an instance of <see cref="AnimalSummary" />.
    /// </summary>
    /// <param name="left">The instance to be transformed.</param>
    /// <returns>A new instance of <see cref="AnimalSummary" />.</returns>
    public AnimalSummary Map(IAnimalSummary? left)
    {
        if (left == null)
        {
            return new AnimalSummary();
        }

        return new AnimalSummary
        {
            Id = left.Id,
            BirthDate = left.BirthDate,
            Deceased = left.Deceased,
            Number = left.Number,
            Sold = left.Sold,
            Subspecies = left.Subspecies,
            Type = left.Type
        };
    }
}
