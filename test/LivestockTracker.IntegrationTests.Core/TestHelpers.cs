using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Given;

public static class TestHelpers
{
    public static HttpClient CreateTestClient()
    {
        return CreateTestClient(null);
    }

    public static HttpClient CreateTestClient(this WebApplicationFactory<Program>? factory)
    {
        factory ??= new();

        return factory.WithWebHostBuilder(builder => { builder.UseEnvironment("Test"); }).CreateClient();
    }
}
