using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Text.Json.Serialization;

namespace LivestockTracker.Units;

/// <summary>
///     The definition of a unit of measurement.
/// </summary>
[DebuggerDisplay("{Id} - {Description} [Deleted: {Deleted}]")]
public class Unit
{
    /// <summary>
    ///     Creates a new instance of <see cref="Unit" />.
    /// </summary>
    /// <param name="description"></param>
    public Unit(string description)
    {
        Id = 0;
        Description = description;
        Deleted = false;
    }

    /// <summary>
    ///     The unique identifier of the unit of measurement.
    /// </summary>
    public int Id { get; private set; }

    /// <summary>
    ///     The user friendly description of the unit of measurement.
    /// </summary>
    [Required]
    public string Description { get; private set; }

    /// <summary>
    ///     Whether the unit of measurement is soft-deleted.
    /// </summary>
    [JsonIgnore]
    public bool Deleted { get; private set; }

    /// <summary>
    ///     Updates the current unit with the desired values provided.
    /// </summary>
    /// <param name="desiredValues">The desired values.</param>
    public void Update(Unit desiredValues)
    {
        Description = desiredValues.Description;
    }

    /// <summary>
    ///     Marks the current unit as deleted.
    /// </summary>
    public void Delete()
    {
        Deleted = true;
    }
}
