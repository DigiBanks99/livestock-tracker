using System.Runtime.Serialization;

namespace LivestockTracker.Exceptions;

/// <summary>
///     The item is deleted and the operation cannot be performed.
/// </summary>
public class DeletedItemNotUpdateableException : InvalidOperationException
{
    /// <summary>
    ///     Initializes a new instance of the <see cref="DeletedItemNotUpdateableException" /> class
    /// </summary>
    public DeletedItemNotUpdateableException()
    {
    }

    /// <summary>
    ///     Initializes a new instance of the <see cref="DeletedItemNotUpdateableException" /> class with the serialized data.
    /// </summary>
    /// <param name="info">The object that holds the serialized data.</param>
    /// <param name="context">The contextual information about the source or destination.</param>
    protected DeletedItemNotUpdateableException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    /// <summary>
    ///     Initializes a new instance of the <see cref="DeletedItemNotUpdateableException" /> class with a specified error
    ///     message
    ///     and a reference to the inner exception that is the cause of this exception.
    /// </summary>
    /// <param name="message">The error message that explains the reason for the exception.</param>
    /// <param name="innerException">
    ///     The exception that is the cause of the current exception. If the innerException parameter is not a null reference
    ///     (Nothing in Visual Basic), the current exception is raised in a catch block that handles the inner exception.
    /// </param>
    public DeletedItemNotUpdateableException(string? message, Exception? innerException) : base(message, innerException)
    {
    }

    /// <summary>
    ///     Initializes a new instance of the <see cref="DeletedItemNotUpdateableException" /> class with a specified error
    ///     message.
    /// </summary>
    /// <param name="message">The error message.</param>
    public DeletedItemNotUpdateableException(string message) : base(message)
    {
    }
}
