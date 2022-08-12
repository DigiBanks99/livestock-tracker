using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace LivestockTracker.Database;

/// <summary>
///     Defines extensions for DbContext
/// </summary>
public static class DbContextExtensions
{
    /// <summary>
    ///     SQLite does not have proper support for <see cref="DateTimeOffset" /> via Entity Framework Core.
    ///     See the limitations here:
    ///     <see href="https://docs.microsoft.com/en-us/ef/core/providers/sqlite/limitations#query-limitations" />.
    ///     To work around this, when the Sqlite database provider is used, all model properties of type
    ///     <see cref="DateTimeOffset" />
    ///     use the <see cref="DateTimeOffsetToBinaryConverter" />.
    ///     Based on: <see href="https://github.com/aspnet/EntityFrameworkCore/issues/10784#issuecomment-415769754" />.<br />
    ///     <strong>NOTE: This only supports millisecond precision.</strong>
    /// </summary>
    /// <param name="dbContext">The <see cref="DbContext" /> instance to which this must be applied.</param>
    /// <param name="modelBuilder">The <see cref="ModelBuilder" /> instance.</param>
    public static void AdaptSqliteDates(this DbContext dbContext, ModelBuilder modelBuilder)
    {
        if (dbContext.Database.ProviderName != "Microsoft.EntityFrameworkCore.Sqlite")
        {
            return;
        }

        foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
        {
            IEnumerable<PropertyInfo> properties = entityType.ClrType
                .GetProperties()
                .Where(p => p.PropertyType == typeof(DateTimeOffset) ||
                            p.PropertyType == typeof(DateTimeOffset?));

            foreach (PropertyInfo property in properties)
            {
                modelBuilder.Entity(entityType.Name)
                    .Property(property.Name)
                    .HasConversion(new DateTimeOffsetToBinaryConverter());
            }
        }
    }
}
