using LivestockTracker;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;

namespace Given;

public abstract class IntegrationTestFixture : IAsyncLifetime
{
    public const string CollectionName = "Livestock Tests";
    private readonly object _objLock = new();

    private HttpClient? _httpClient;

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
        connectionStringBuilder = new SqliteConnectionStringBuilder(connectionString);

        DatabaseConnection = new SqliteConnection(connectionStringBuilder.ConnectionString);
        _httpClient = null;
    }

    public SqliteConnection DatabaseConnection { get; }

    public HttpClient Client => _httpClient ?? throw new InvalidOperationException(
        $"The Host has not been initialized yet. Please ensure {nameof(InitializeAsync)} has been called.");

    public WebApplicationFactory<Startup> Factory { get; }

    public Task DisposeAsync()
    {
        Client.Dispose();
        return DatabaseConnection.CloseAsync();
    }

    public Task InitializeAsync()
    {
        lock (_objLock)
        {
            _httpClient = Factory.CreateTestClient();
        }

        return Task.CompletedTask;
    }
}
