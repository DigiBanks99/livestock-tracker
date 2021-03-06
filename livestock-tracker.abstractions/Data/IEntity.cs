namespace LivestockTracker.Abstractions.Data
{
    /// <summary>
    /// The base interface for all other database models.
    /// </summary>
    /// <typeparam name="TKey">The type of the key for this database model.</typeparam>
    public interface IEntity<TKey> where TKey : struct
    {
        /// <summary>
        /// The unique identifier of the entity.
        /// </summary>
        TKey Id { get; set; }

        /// <summary>
        /// Get the current key. This allows the key to be named differently over entities or be a composite key.
        /// </summary>
        /// <returns>The value of the object's key</returns>
        TKey GetKey();
    }
}
