using System.Diagnostics;

namespace LivestockTracker.Medicine;

/// <summary>
/// The type of medicines that can be administered to an animal.
/// </summary>
[DebuggerDisplay("{Id} - {Description} [Deleted: {Deleted}]")]
public class MedicineType : IMedicineType
{
    /// <summary>
    /// The unique identifier of the medicine type.
    /// </summary>
    public int Id { get; set; }
    /// <summary>
    /// The friendly name of the medicine type.
    /// </summary>
    public string Description { get; set; } = string.Empty;
    /// <summary>
    /// Whether the medicine type is considered deleted and nolonger available for selection.
    /// </summary>
    public bool Deleted { get; set; } = false;
}
