namespace LivestockTracker.Medicine;

/// <summary>
///     Provides create, read and update and deletion services for medicine types.
/// </summary>
public interface IMedicineTypeManager
{
    /// <summary>
    ///     Adds a medicine type if it doesn't exist yet.
    /// </summary>
    /// <param name="medicineType">The request to create a medicine type.</param>
    /// <param name="cancellationToken">A token that can be used to cancel the request to create a medicine type.</param>
    /// <returns>The created medicine type.</returns>
    Task<MedicineType> AddAsync(MedicineType medicineType, CancellationToken cancellationToken);

    /// <summary>
    ///     Updates a medicine type if it exists.
    /// </summary>
    /// <param name="id">The unique identifier of a medicine.</param>
    /// <param name="medicineType">The details of the updated properties of the medicine type.</param>
    /// <param name="cancellationToken">A token that can be used to cancel the request to update a medicine type.</param>
    /// <returns>The updated medicine type.</returns>
    Task<MedicineType> UpdateAsync(int id, MedicineType medicineType, CancellationToken cancellationToken);

    /// <summary>
    ///     Flags the record in the persisted store as Deleted. It does not physically delete the record
    ///     to ensure relationships for history items are kept intact.
    /// </summary>
    /// <param name="id">The ID for the medicine type.</param>
    /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
    /// <returns>The ID of the medicine type that was marked as Deleted.</returns>
    Task<int> RemoveAsync(int id, CancellationToken cancellationToken);
}
