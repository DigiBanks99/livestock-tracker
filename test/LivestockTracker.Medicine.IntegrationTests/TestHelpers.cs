using LivestockTracker;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;

namespace IntegrationTests;

internal static class TestHelpers
{
    public static HttpClient CreateTestClient()
    {
        return CreateTestClient(null);
    }

    public static HttpClient CreateTestClient(this WebApplicationFactory<Startup>? factory)
    {
        factory ??= new();

        return factory.WithWebHostBuilder(builder =>
        {
            _ = builder.UseEnvironment("Test");
        }).CreateClient();
    }
}
