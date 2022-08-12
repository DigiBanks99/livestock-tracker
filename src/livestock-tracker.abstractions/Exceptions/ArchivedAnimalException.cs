using System.Runtime.Serialization;

namespace LivestockTracker.Exceptions;

/// <summary>
///     The animal is archived and the operation cannot be performed.
/// </summary>
public class ArchivedAnimalException : InvalidOperationException
{
    /// <summary>
    ///     Initializes a new instance of the <see cref="ArchivedAnimalException" /> class
    /// </summary>
    public ArchivedAnimalException()
    {
    }

    /// <summary>
    ///     Initializes a new instance of the <see cref="ArchivedAnimalException" /> class with a specified error message.
    /// </summary>
    /// <param name="message">The error message.</param>
    public ArchivedAnimalException(string message) : base(message)
    {
    }

    /// <summary>
    ///     Initializes a new instance of the <see cref="ArchivedAnimalException" /> class with the serialized data.
    /// </summary>
    /// <param name="info">The object that holds the serialized data.</param>
    /// <param name="context">The contextual information about the source or destination.</param>
    protected ArchivedAnimalException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    /// <summary>
    ///     Initializes a new instance of the <see cref="ArchivedAnimalException" /> class with a specified error message
    ///     and a reference to the inner exception that is the cause of this exception.
    /// </summary>
    /// <param name="message">The error message that explains the reason for the exception.</param>
    /// <param name="innerException">
    ///     The exception that is the cause of the current exception. If the innerException parameter is not a null reference
    ///     (Nothing in Visual Basic), the current exception is raised in a catch block that handles the inner exception.
    /// </param>
    public ArchivedAnimalException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}
