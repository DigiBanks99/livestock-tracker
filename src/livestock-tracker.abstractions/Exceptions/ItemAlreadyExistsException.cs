using System;
using System.Runtime.Serialization;

namespace LivestockTracker;

public class ItemAlreadyExistsException<TKeyType> : Exception
{
    private readonly TKeyType? _key;

    public ItemAlreadyExistsException()
    {
    }

    public ItemAlreadyExistsException(TKeyType key, string itemTypeDescription)
        : this($"{itemTypeDescription} with key {key} already exists.")
    {
        _key = key;
        ItemTypeDescription = itemTypeDescription;
    }

    public ItemAlreadyExistsException(string? message) : base(message)
    {
    }

    public ItemAlreadyExistsException(string? message, Exception? innerException) : base(message, innerException)
    {
    }

    protected ItemAlreadyExistsException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public TKeyType Key => _key ?? throw new ArgumentException(nameof(Key));
    public string ItemTypeDescription { get; } = string.Empty;
}
