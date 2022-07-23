using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Text.Json.Serialization;

namespace LivestockTracker.Units;

/// <summary>
/// The definition of a unit of measurement.
/// </summary>
[DebuggerDisplay("{Id} - {Description} [Deleted: {Deleted}]")]
public class Unit : IUnit
{
    /// <summary>
    /// The unique identifier of the unit of measurement.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// The user friendly description of the unit of measurement.
    /// </summary>
    [Required] public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Whether the unit of measurement is soft-deleted.
    /// </summary>
    [JsonIgnore] public bool Deleted { get; set; }
}
