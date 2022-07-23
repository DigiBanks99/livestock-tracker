using System.Runtime.Serialization;

namespace LivestockTracker;

/// <summary>
///     An exception that indicates that an item already exists in the collection.
/// </summary>
/// <typeparam name="TKeyType">The type of the identifier used.</typeparam>
public class ItemAlreadyExistsException<TKeyType> : Exception
{
    private readonly TKeyType? _key;

    /// <summary>
    ///     Creates a new instance of <see cref="ItemAlreadyExistsException{TKeyType}" /> with the default message.
    /// </summary>
    public ItemAlreadyExistsException() : base("An item with this key already exists.")
    {
    }

    /// <summary>
    ///     Creates a new instance of <see cref="ItemAlreadyExistsException{TKeyType}" /> that reference the key and describes
    ///     the item.
    /// </summary>
    /// <param name="key">The value of the key used to find the item.</param>
    /// <param name="itemTypeDescription">The user friendly description of the item.</param>
    public ItemAlreadyExistsException(TKeyType key, string itemTypeDescription)
        : this($"{itemTypeDescription} with key {key} already exists.")
    {
        _key = key;
        ItemTypeDescription = itemTypeDescription;
    }

    /// <summary>
    ///     Creates a new instance of <see cref="ItemAlreadyExistsException{TKeyType}" /> with the given message.
    /// </summary>
    /// <param name="message">The client provided exception message.</param>
    public ItemAlreadyExistsException(string? message) : base(message)
    {
    }

    /// <summary>
    ///     Creates a new instance of <see cref="ItemAlreadyExistsException{TKeyType}" /> with the given message and inner
    ///     exception.
    /// </summary>
    /// <param name="message">The client provided exception message.</param>
    /// <param name="innerException">The source exception.</param>
    public ItemAlreadyExistsException(string? message, Exception? innerException) : base(message, innerException)
    {
    }

    /// <summary>
    ///     Creates a serialized instance of <see cref="ItemAlreadyExistsException{TKeyType}" /> with the given serialization
    ///     info.
    /// </summary>
    /// <param name="info">The serialization info.</param>
    /// <param name="context">The serialization context.</param>
    protected ItemAlreadyExistsException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    /// <summary>
    ///     The key of the item that was not found.
    /// </summary>
    /// <exception cref="ArgumentException">If the key is read and none was provided.</exception>
    public TKeyType Key => _key ?? throw new ArgumentException(nameof(Key));

    /// <summary>
    ///     The user friendly description of the item.
    /// </summary>
    public string ItemTypeDescription { get; } = string.Empty;
}
