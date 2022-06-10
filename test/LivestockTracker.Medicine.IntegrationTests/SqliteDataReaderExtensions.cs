namespace Given;
internal static class SqliteDataReaderExtensions
{
    internal static DateTimeOffset GetDateTimeOffsetFromOrdinal(this SqliteDataReader dataReader, int ordinal)
    {
        long value = dataReader.GetFieldValue<long>(ordinal);
        return new DateTimeOffset(new DateTime((value >> 11) * 1000),
                                  new TimeSpan(0, (int)(value << 53 >> 53), 0));
    }
}
