using LivestockTracker.Abstractions.Data;
using LivestockTracker.Database;
using LivestockTracker.Database.Sqlite;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;

namespace LivestockTracker;

/// <summary>
/// Provides extension methods for Livestock Tracker Database middleware.
/// </summary>
public static class SqliteDatabaseExtensions
{
    private const long UnixEpochSeconds = 621355968000000;
    private const int DateTimeOffsetBitwiseShiftBitCount = 11;

    /// <summary>
    /// Adds the Livestock Tracker SQLite Database provider to the specified <see cref="IServiceCollection"/>.
    /// </summary>
    /// <param name="services">The service collection for dependency injection.</param>
    /// <param name="config">The configuration values.</param>
    /// <param name="env">The current hosting environment information.</param>
    /// <returns>The extended service collection.</returns>
    public static IServiceCollection AddLivestockTrackerSqliteDatabase(this IServiceCollection services, IConfiguration config, IHostEnvironment env)
    {
        string? connectionString = config.GetConnectionString("DefaultConnection");
        SqliteConnection connection = OpenConnection(connectionString);

        services.AddDbContext<LivestockContext>(options => ConfigureSqlite(options, connection))
                .AddScoped<ISeedData, SqliteSeedData>();
        if (env.IsDev())
        {
            services.AddScoped<ISeedData, DevSqliteSeedData>();
        }
        return services;
    }

    internal static MigrationBuilder AlterColumnDataTypeDateTimeOffsetToLong(this MigrationBuilder migrationBuilder, IEnumerable<string> propertyNames, string tableName)
    {
        StringBuilder sb = new();
        sb.AppendLine($"UPDATE \"{tableName}\"");
        sb.Append("SET ");

        int index = 0;
        IEnumerable<string> propNamesArray = propertyNames as string[] ?? propertyNames.ToArray();
        foreach (string propertyName in propNamesArray)
        {
            sb.Append($"\"{propertyName}\" = (strftime('%s', \"{propertyName}\") * 10000 + {UnixEpochSeconds}) << {DateTimeOffsetBitwiseShiftBitCount}");
            if (++index < propNamesArray.Count())
            {
                sb.AppendLine(",");
            }
        }

        sb.Append(';');

        migrationBuilder.Sql(sql: sb.ToString());

        return migrationBuilder;
    }

    internal static MigrationBuilder AlterColumnDataTypeLongToDateTimeOffset(this MigrationBuilder migrationBuilder, IEnumerable<string> propertyNames, string tableName)
    {
        StringBuilder sb = new();
        sb.AppendLine($"UPDATE \"{tableName}\"");
        sb.Append("SET ");

        int index = 0;
        IEnumerable<string> propNamesArray = propertyNames as string[] ?? propertyNames.ToArray();
        foreach (string propertyName in propNamesArray)
        {
            sb.Append($"\"{propertyName}\" = datetime(((\"{propertyName}\" >> {DateTimeOffsetBitwiseShiftBitCount}) - {UnixEpochSeconds}) / 10000, 'unixepoch')");
            if (++index < propNamesArray.Count())
            {
                sb.AppendLine(",");
            }
        }

        sb.Append(';');

        migrationBuilder.Sql(sql: sb.ToString());

        return migrationBuilder;
    }

    private static SqliteConnection OpenConnection(string connectionString)
    {
        SqliteConnection connection = new(connectionString);
        connection.Open();
        connection.EnableExtensions();
        return connection;
    }

    private static DbContextOptionsBuilder ConfigureSqlite(DbContextOptionsBuilder options, DbConnection connection)
    {
        return options.UseSqlite(connection, builder => builder.MigrationsAssembly("livestock-tracker.database.sqlite")
                                                               .UseRelationalNulls());
    }
}
