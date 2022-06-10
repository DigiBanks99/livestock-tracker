using LivestockTracker;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;

namespace Given;

public class IntegrationTestFixture : IAsyncLifetime
{
    public const string CollectionName = "Livestock Tests";

    private HttpClient? _httpClient;
    private readonly object objLock = new();

    public IntegrationTestFixture()
    {
        Factory = new WebApplicationFactory<Startup>();

        IConfigurationBuilder? configBuilder = new ConfigurationBuilder()
            .AddInMemoryCollection()
            .AddEnvironmentVariables()
            .AddJsonFile("appsettings.json")
            .AddJsonFile("appsettings.Test.json");

        IConfiguration config = configBuilder.Build();
        string? connectionString = config.GetConnectionString("DefaultConnection");
        SqliteConnectionStringBuilder connectionStringBuilder;
        try
        {
            connectionStringBuilder = new(connectionString);
        }
        catch (FormatException)
        {
            // TODO: custom exception
            throw;
        }

        DatabaseConnection = new SqliteConnection(connectionStringBuilder.ConnectionString);
        _httpClient = null;
    }

    public SqliteConnection DatabaseConnection { get; private set; }
    public HttpClient Client => _httpClient ?? throw new InvalidOperationException($"The Host has not been initialized yet. Please ensure {nameof(InitializeAsync)} has been called.");

    public WebApplicationFactory<Startup> Factory { get; }

    public Task DisposeAsync()
    {
        Client.Dispose();
        return DatabaseConnection.CloseAsync();
    }

    public Task InitializeAsync()
    {
        lock (objLock)
        {
            _httpClient = Factory.CreateTestClient();
        }

        return Task.CompletedTask;
    }
}

[CollectionDefinition(IntegrationTestFixture.CollectionName)]
public class LivestockTestCollection : ICollectionFixture<IntegrationTestFixture> { }
