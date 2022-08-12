using System.Runtime.Serialization;

namespace LivestockTracker.Exceptions;

/// <summary>
/// An exception that indicates that a transaction was created
/// for an animal that doesn't exist.
/// </summary>
[Serializable]
public class TransactionRequiresAnimalException : ArgumentException
{
    /// <summary>
    /// The identifier for the animal.
    /// </summary>
    public long AnimalId { get; private set; }

    /// <summary>
    /// Initializes a new instance of the <see cref="TransactionRequiresAnimalException"/> class.
    /// </summary>
    public TransactionRequiresAnimalException()
    {
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="TransactionRequiresAnimalException"/> class
    /// with the animal identifier.
    /// </summary>
    /// <param name="animalId">The identifier for the animal that is missing.</param>
    public TransactionRequiresAnimalException(long animalId)
        : base("The animal for this transaction could not be found.")
    {
        AnimalId = animalId;
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="TransactionRequiresAnimalException"/> class
    /// with a specified error message.
    /// </summary>
    /// <param name="message">The message that describes the error.</param>
    public TransactionRequiresAnimalException(string? message) : base(message)
    {
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="TransactionRequiresAnimalException"/> class
    /// with a specified error message and a reference to the inner exception that is the cause
    /// of this exception.
    /// </summary>
    /// <param name="message">The message that describes the error.</param>
    /// <param name="innerException">
    /// The exception that is the cause of the current exception, or a null reference
    /// if no inner exception is specified.
    /// </param>
    public TransactionRequiresAnimalException(string? message, Exception? innerException) : base(message, innerException)
    {
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="TransactionRequiresAnimalException"/> class
    /// with the animal identifier and a reference to the inner exception that is the cause of
    /// this exception.
    /// </summary>
    /// <param name="animalId">The identifier for the animal that is missing.</param>
    /// <param name="innerException">
    /// The exception that is the cause of the current exception, or a null reference
    /// if no inner exception is specified.
    /// </param>
    public TransactionRequiresAnimalException(long animalId, Exception? innerException)
        : base("The animal for this transaction could not be found.", innerException)
    {
        AnimalId = animalId;
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="TransactionRequiresAnimalException"/> class
    /// with serialized data.
    /// </summary>
    /// <param name="info">
    /// The <see cref="SerializationInfo"/> that holds the serialized object data about the
    /// exception being thrown.
    /// </param>
    /// <param name="context">
    /// The <see cref="StreamingContext" /> that contains contextual information about the
    /// source or destination.
    /// </param>
    protected TransactionRequiresAnimalException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }
}
