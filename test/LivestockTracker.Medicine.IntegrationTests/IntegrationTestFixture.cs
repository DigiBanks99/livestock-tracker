using LivestockTracker;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace IntegrationTests;

public class IntegrationTestFixture : IAsyncLifetime
{
    public const string CollectionName = "Livestock Tests";

    private HttpClient? _httpClient;
    private readonly object objLock = new();

    public IntegrationTestFixture()
    {
        Factory = new WebApplicationFactory<Startup>();

        var configBuilder = new ConfigurationBuilder().AddInMemoryCollection()
                                                      .AddEnvironmentVariables()
                                                      .AddJsonFile("appsettings.json")
                                                      .AddJsonFile("appsettings.Test.json");

        IConfiguration config = configBuilder.Build();
        var connectionString = config.GetConnectionString("DefaultConnection");
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

        DatabaseConnection = new SqlConnection(connectionStringBuilder.ConnectionString);
        _httpClient = null;
    }

    public SqlConnection DatabaseConnection { get; private set; }
    public HttpClient Client
    {
        get
        {
            if (_httpClient == null)
            {
                throw new InvalidOperationException($"The Host has not been initialized yet. Please ensure {nameof(InitializeAsync)} has been called.");
            }

            return _httpClient;
        }
    }

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
