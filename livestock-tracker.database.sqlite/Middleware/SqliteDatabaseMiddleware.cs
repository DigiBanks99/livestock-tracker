using LivestockTracker.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LivestockTracker
{
    /// <summary>
    /// Provides extension methods for Livestock Tracker Database middleware.
    /// </summary>
    public static class SqliteDatabaseMiddleware
    {
        private const long UnixEpochSeconds = 621355968000000;
        private const int DateTimeOffsetBitwiseShiftBitCount = 11;

        /// <summary>
        /// Adds the Livestock Tracker SQLite Database provider to the specified <see cref="IServiceCollection"/>.
        /// </summary>
        /// <param name="services">The service collection for dependency injection.</param>
        /// <returns>The extended service collection.</returns>
        public static IServiceCollection AddLivestockTrackerSqliteDatabase(this IServiceCollection services, IConfiguration config)
        {
            var connectionString = config.GetConnectionString("DefaultConnection");

            services.AddDbContext<LivestockContext>(options => options.UseSqlite(connectionString, x => x.MigrationsAssembly("livestock-tracker.database.sqlite")));
            return services;
        }

        internal static MigrationBuilder AlterColumnDataTypeDateTimeOffsetToLong(this MigrationBuilder migrationBuilder, IEnumerable<string> propertyNames, string tableName)
        {
            var sb = new StringBuilder();
            sb.AppendLine($"UPDATE \"{tableName}\"");
            sb.Append("SET ");

            var index = 0;
            foreach (var propertyName in propertyNames)
            {
                sb.Append($"\"{propertyName}\" = (strftime('%s', \"{propertyName}\") * 10000 + {UnixEpochSeconds}) << {DateTimeOffsetBitwiseShiftBitCount}");
                if (++index < propertyNames.Count())
                {
                    sb.AppendLine(",");
                }
            }

            sb.Append(";");

            migrationBuilder.Sql(sql: sb.ToString());

            return migrationBuilder;
        }

        internal static MigrationBuilder AlterColumnDataTypeLongToDateTimeOffset(this MigrationBuilder migrationBuilder, IEnumerable<string> propertyNames, string tableName)
        {
            var sb = new StringBuilder();
            sb.AppendLine($"UPDATE \"{tableName}\"");
            sb.Append("SET ");

            var index = 0;
            foreach (var propertyName in propertyNames)
            {
                sb.Append($"\"{propertyName}\" = datetime(((\"{propertyName}\" >> {DateTimeOffsetBitwiseShiftBitCount}) - {UnixEpochSeconds}) / 10000, 'unixepoch')");
                if (++index < propertyNames.Count())
                {
                    sb.AppendLine(",");
                }
            }

            sb.Append(";");

            migrationBuilder.Sql(sql: sb.ToString());

            return migrationBuilder;
        }
    }
}
