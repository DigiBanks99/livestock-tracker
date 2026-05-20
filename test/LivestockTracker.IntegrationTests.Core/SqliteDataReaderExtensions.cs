using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
namespace Given;

public static class SqliteDataReaderExtensions
{
    private static readonly DateTimeOffsetToBinaryConverter DateTimeOffsetConverter = new();

    public static DateTimeOffset GetDateTimeOffsetFromOrdinal(this SqliteDataReader dataReader, int ordinal)
    {
        long value = dataReader.GetFieldValue<long>(ordinal);
        return (DateTimeOffset)DateTimeOffsetConverter.ConvertFromProvider(value)!;
    }
}
