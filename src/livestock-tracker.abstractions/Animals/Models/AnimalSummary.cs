using System.Diagnostics;

namespace LivestockTracker.Animals;

/// <summary>
///     A summary of an animal.
/// </summary>
[DebuggerDisplay(
    "[{Id} - {Number}]{Archived ? \" A\" : string.Empty}: {BirthDate.ToString(\"o\")} - Sold: {Sold}, Deceased: {Deceased}")]
public class AnimalSummary : IAnimalSummary
{
    /// <summary>
    ///     Creates a new instance of <see cref="AnimalSummary" />.
    /// </summary>
    /// <param name="id">The unique identifier of the animal.</param>
    /// <param name="archived">Indicator of if the animal was archived.</param>
    /// <param name="type">The type of animal.</param>
    /// <param name="subspecies">The animal subspecies.</param>
    /// <param name="number">The unique number for the animal as provided by the tenant.</param>
    /// <param name="deceased">An indicator of if the animal is deceased.</param>
    /// <param name="birthDate">The date of birth of the animal.</param>
    /// <param name="sold">An indicator of if the animal has been sold.</param>
    public AnimalSummary(long id, bool archived, int number, AnimalType type, string? subspecies, bool sold,
        bool deceased, DateTimeOffset birthDate)
    {
        Archived = archived;
        Id = id;
        Number = number;
        Type = type;
        Subspecies = subspecies;
        Sold = sold;
        Deceased = deceased;
        BirthDate = birthDate;
    }

    /// <summary>
    ///     Whether the animal has been archived.
    /// </summary>
    public bool Archived { get; }

    /// <summary>
    ///     The unique identifier of the animal
    /// </summary>
    public long Id { get; }

    /// <summary>
    ///     The human readable animal number.
    /// </summary>
    public int Number { get; }

    /// <summary>
    ///     The type of animal.
    /// </summary>
    public AnimalType Type { get; }

    /// <summary>
    ///     The sub species of the animal.
    /// </summary>
    public string? Subspecies { get; }

    /// <summary>
    ///     Whether the animal has been sold.
    /// </summary>
    public bool Sold { get; }

    /// <summary>
    ///     Whether the animal is deceased.
    /// </summary>
    public bool Deceased { get; }

    /// <summary>
    ///     The date the animal was born.
    /// </summary>
    public DateTimeOffset BirthDate { get; }
}
