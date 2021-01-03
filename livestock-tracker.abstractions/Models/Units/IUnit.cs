namespace LivestockTracker.Abstractions.Models.Units
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

        /// <summary>
        /// A flag to indicate if the record has been deleted.
        /// </summary>
        bool Deleted { get; }
    }
}
