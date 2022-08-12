using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using LivestockTracker.Animals;
using LivestockTracker.Data;
using LivestockTracker.Database;
using LivestockTracker.Database.Sqlite;
using LivestockTracker.Feed;
using LivestockTracker.Medicine;
using LivestockTracker.Units;
using LivestockTracker.Weight;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace LivestockTracker;

/// <summary>
///     Provides extension methods for Livestock Tracker Database middleware.
/// </summary>
public static class SqliteDatabaseExtensions
{
    private const long UnixEpochSeconds = 621355968000000;
    private const int DateTimeOffsetBitwiseShiftBitCount = 11;

    /// <summary>
    ///     Adds the Livestock Tracker SQLite Database provider to the specified <see cref="IServiceCollection" />.
    /// </summary>
    /// <param name="services">The service collection for dependency injection.</param>
    /// <param name="config">The configuration values.</param>
    /// <param name="env">The current hosting environment information.</param>
    /// <returns>The extended service collection.</returns>
    public static IServiceCollection AddLivestockTrackerSqliteDatabase(this IServiceCollection services,
        IConfiguration config, IHostEnvironment env)
    {
        string? connectionString = config.GetConnectionString("DefaultConnection");
        SqliteConnection connection = OpenConnection(connectionString);

        services.AddDbContext<LivestockContext, SqliteLivestockContext>(options =>
                ConfigureSqlite(options, connection, env))
            .AddScoped<ISeedData, SqliteSeedData>();
        if (env.IsDev())
        {
            services.AddScoped<ISeedData, DevSqliteSeedData>();
        }

        return services;
    }

    internal static MigrationBuilder AlterColumnDataTypeDateTimeOffsetToLong(this MigrationBuilder migrationBuilder,
        IEnumerable<string> propertyNames, string tableName)
    {
        StringBuilder sb = new();
        sb.AppendLine($"UPDATE \"{tableName}\"");
        sb.Append("SET ");

        int index = 0;
        string[] propNamesArray = propertyNames as string[] ?? propertyNames.ToArray();
        foreach (string propertyName in propNamesArray)
        {
            sb.Append(
                $"\"{propertyName}\" = (strftime('%s', \"{propertyName}\") * 10000 + {UnixEpochSeconds}) << {DateTimeOffsetBitwiseShiftBitCount}");
            if (++index < propNamesArray.Length)
            {
                sb.AppendLine(",");
            }
        }

        sb.Append(';');

        migrationBuilder.Sql(sb.ToString());

        return migrationBuilder;
    }

    internal static MigrationBuilder AlterColumnDataTypeLongToDateTimeOffset(this MigrationBuilder migrationBuilder,
        IEnumerable<string> propertyNames, string tableName)
    {
        StringBuilder sb = new();
        sb.AppendLine($"UPDATE \"{tableName}\"");
        sb.Append("SET ");

        int index = 0;
        string[] propNamesArray = propertyNames as string[] ?? propertyNames.ToArray();
        foreach (string propertyName in propNamesArray)
        {
            sb.Append(
                $"\"{propertyName}\" = datetime(((\"{propertyName}\" >> {DateTimeOffsetBitwiseShiftBitCount}) - {UnixEpochSeconds}) / 10000, 'unixepoch')");
            if (++index < propNamesArray.Length)
            {
                sb.AppendLine(",");
            }
        }

        sb.Append(';');

        migrationBuilder.Sql(sb.ToString());

        return migrationBuilder;
    }

    private static SqliteConnection OpenConnection(string connectionString)
    {
        SqliteConnection connection = new(connectionString);
        connection.Open();
        connection.EnableExtensions();
        return connection;
    }

    private static DbContextOptionsBuilder ConfigureSqlite(DbContextOptionsBuilder options, DbConnection connection,
        IHostEnvironment env)
    {
        const string migrationAssemblyName = "livestock-tracker.database.sqlite";
        options.UseSqlite(connection,
            builder => builder.MigrationsAssembly(migrationAssemblyName).UseRelationalNulls());

        if (env.IsProduction())
        {
            return options;
        }

        options.EnableDetailedErrors();
        options.EnableSensitiveDataLogging();
        return options;
    }
}

internal static class ModelBuilderExtensions
{
    internal static ModelBuilder ConfigureAnimalModels(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Animal>(config =>
        {
            config.ToTable("Animals");
            config.Property(animal => animal.Id).HasColumnName("ID");
        });

        return modelBuilder;
    }

    internal static ModelBuilder ConfigureFeedModels(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<FeedType>(config =>
        {
            config.ToTable("FeedTypes");
            config.Property(feedType => feedType.Id).HasColumnName("ID");
        });

        modelBuilder.Entity<FeedingTransaction>(config =>
        {
            config.ToTable("FeedingTransactions");
            config.Property(transaction => transaction.Id).HasColumnName("ID");
            config.Property(transaction => transaction.AnimalId).HasColumnName("AnimalID");
            config.Property(transaction => transaction.FeedTypeId).HasColumnName("FeedTypeID");
            config.Property(transaction => transaction.UnitId).HasColumnName("UnitID");
        });
        return modelBuilder;
    }

    internal static ModelBuilder ConfigureMedicineModels(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MedicineType>(config =>
        {
            config.ToTable("MedicineTypes");
            config.Property(medicineType => medicineType.Id).HasColumnName("ID");
        });

        modelBuilder.Entity<MedicalTransaction>(config =>
        {
            config.ToTable("MedicalTransactions");
            config.Property(transaction => transaction.Id).HasColumnName("ID");
            config.Property(transaction => transaction.AnimalId).HasColumnName("AnimalID");
            config.Property(transaction => transaction.MedicineId).HasColumnName("MedicineID");
            config.Property(transaction => transaction.UnitId).HasColumnName("UnitID");
        });
        return modelBuilder;
    }

    internal static ModelBuilder ConfigureUnitModels(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Unit>(config =>
        {
            config.ToTable("Units");
            config.Property(unit => unit.Id).HasColumnName("ID");
        });

        return modelBuilder;
    }

    internal static ModelBuilder ConfigureWeightModels(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<WeightTransaction>(config =>
        {
            config.ToTable("WeightTransactions");
            config.Property(transaction => transaction.Id).HasColumnName("ID");
            config.Property(transaction => transaction.AnimalId).HasColumnName("AnimalID");
        });
        return modelBuilder;
    }
}
