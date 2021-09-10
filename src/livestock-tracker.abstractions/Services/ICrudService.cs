using System;

namespace LivestockTracker.Abstractions.Services
{
    /// <summary>
    /// Defines functionality for basic CRUD operations.
    /// </summary>
    /// <typeparam name="TDto">The type of the object to be returned.</typeparam>
    /// <typeparam name="TKey">The type of the key of the object.</typeparam>
    public interface ICrudService<TDto, TKey> : IFetchService<TDto, TKey>
        where TDto : class
        where TKey : IConvertible
    {
        /// <summary>
        /// Add an item to the data store.
        /// </summary>
        /// <param name="item">The object to be added.</param>
        /// <returns>An instance of the added record.</returns>
        TDto Add(TDto item);

        /// <summary>
        /// Update the values of an item in the data store.
        /// </summary>
        /// <param name="item">
        ///     The object that contains the values that need to be used for updating the record.
        /// </param>
        /// <returns>An instance of updated record.</returns>
        TDto Update(TDto item);

        /// <summary>
        /// Remove a record from the data store.
        /// </summary>
        /// <param name="key">The key that uniquely identifies the record.</param>
        /// <returns>The key of the record that was removed.</returns>
        TKey Remove(TKey key);
    }
}
