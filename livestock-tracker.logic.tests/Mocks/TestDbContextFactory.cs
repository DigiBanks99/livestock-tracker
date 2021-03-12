using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace LivestockTracker.Database.Test.Mocks
{
    public static class TestDbContextFactory
    {
        public static LivestockContext Create()
        {
            var connection = OpenConnection();
            var options = GetOptions(connection);
            var context = new LivestockContext(options);
            context.Database.EnsureCreated();
            return context;
        }

        private static DbContextOptions<LivestockContext> GetOptions(SqliteConnection connection)
        {
            return new DbContextOptionsBuilder<LivestockContext>()
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
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
