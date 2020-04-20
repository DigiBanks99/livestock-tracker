namespace LivestockTracker.Abstractions.Models
{
    /// <summary>
    /// Defines all the properties of a unit of measurement.
    /// </summary>
    public interface IUnit
    {
        /// <summary>
        /// A key that uniquely identifies the unit of measurement.
        /// </summary>
        int Id { get; }

        /// <summary>
        /// A human readable description of the unit of measurement.
        /// </summary>
        string Description { get; }
    }
}
