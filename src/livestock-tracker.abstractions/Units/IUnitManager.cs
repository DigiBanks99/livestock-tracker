namespace LivestockTracker.Units;

/// <summary>
///     Defines operations for maintaining <see cref="Unit" /> data.
/// </summary>
public interface IUnitManager
{
    /// <summary>
    ///     Attempts to add a new <see cref="Unit" /> with the given values.
    /// </summary>
    /// <param name="requestedUnit">The values desired for the new unit.</param>
    /// <param name="cancellationToken">A token that can be used to cancel long running tasks</param>
    /// <returns>A reference to the saved <see cref="Unit" />.</returns>
    Task<Unit> AddUnitAsync(Unit requestedUnit, CancellationToken cancellationToken);

    /// <summary>
    /// </summary>
    /// <param name="id"></param>
    /// <param name="requestedValues"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    Task<Unit> UpdateAsync(int id, Unit requestedValues, CancellationToken cancellationToken);

    /// <summary>
    /// </summary>
    /// <param name="id"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    Task<int> RemoveAsync(int id, CancellationToken cancellationToken);
}
