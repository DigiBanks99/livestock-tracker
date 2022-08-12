namespace LivestockTracker.Exceptions;

/// <summary>
///     Indicates a database entity was not found.
/// </summary>
/// <typeparam name="T">The type of database entity.</typeparam>
public class EntityNotFoundException<T> : Exception
{
    /// <summary>
    ///     Creates a new instance of <see cref="EntityNotFoundException{T}" /> with the given
    ///     <paramref name="id" />.
    /// </summary>
    /// <param name="id">The ID used to try and retrieve the database entity.</param>
    public EntityNotFoundException(long id) : base($"{typeof(T).Name} with id {id} not found.")
    {
    }
}
