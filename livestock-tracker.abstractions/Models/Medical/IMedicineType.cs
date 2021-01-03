namespace LivestockTracker.Abstractions.Models.Medical
{
    /// <summary>
    /// Defines the properties of a type of medication.
    /// </summary>
    public interface IMedicineType
    {
        /// <summary>
        /// A key that uniquely identifies the type of medication.
        /// </summary>
        int Id { get; }

        /// <summary>
        /// The human readable description of the type of medication.
        /// </summary>
        string Description { get; }

        /// <summary>
        /// A flag to indicate if the record has been deleted.
        /// </summary>
        bool Deleted { get; }
    }
}
