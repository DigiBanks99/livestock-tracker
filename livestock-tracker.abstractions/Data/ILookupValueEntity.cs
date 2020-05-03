namespace LivestockTracker.Abstractions.Data
{
    /// <summary>
    /// Defines the operations and members of a database entity that will serve as a
    /// lookup value.
    /// </summary>
    /// <typeparam name="TKey">The type of the key for this database model.</typeparam>
    public interface ILookupValueEntity<TKey> : IEntity<TKey>
        where TKey : struct
    {
        /// <summary>
        /// The lookup description value.
        /// </summary>
        string Description { get; set; }

        /// <summary>
        /// Flag to indicate if the record is deleted or not.
        /// </summary>
        bool Deleted { get; set; }
    }
}
