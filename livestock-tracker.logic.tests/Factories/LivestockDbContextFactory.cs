using LivestockTracker.Database;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace LivestockTracker.Logic.Tests.Factories
{
    public static class LivestockDbContextFactory
    {
        public static LivestockContext Create(ILoggerFactory loggerFactory)
        {
            var connection = OpenConnection();
            var options = GetOptions(connection, loggerFactory);
            var context = new LivestockContext(options);
            context.Database.EnsureCreated();
            return context;
        }

        private static DbContextOptions<LivestockContext> GetOptions(SqliteConnection connection, ILoggerFactory loggerFactory)
        {
            return new DbContextOptionsBuilder<LivestockContext>()
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
                .UseLoggerFactory(loggerFactory)
                .UseSqlite(connection, builder => builder.UseNetTopologySuite()
                                                         .UseRelationalNulls())
                .Options;
        }

        private static SqliteConnection OpenConnection()
        {
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();
            connection.EnableExtensions();
            return connection;
        }
    }
}
