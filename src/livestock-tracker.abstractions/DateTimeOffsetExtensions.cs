using System;

namespace LivestockTracker;

/// <summary>
///     Helpers for working with <see cref="DateTimeOffset" /> values in the domain model.
/// </summary>
public static class DateTimeOffsetExtensions
{
    /// <summary>
    ///     Trims a timestamp to millisecond precision for SQLite persistence.
    /// </summary>
    /// <param name="value">The value to normalize.</param>
    /// <returns>The same timestamp rounded down to millisecond precision.</returns>
    public static DateTimeOffset TrimToMilliseconds(this DateTimeOffset value)
    {
        return value.AddTicks(-(value.Ticks % TimeSpan.TicksPerMillisecond));
    }
}
