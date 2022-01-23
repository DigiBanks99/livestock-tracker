using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Net.Http;

namespace LivestockTracker.Medicine.IntegrationTests
{
    internal static class TestHelpers
    {
        public static HttpClient CreateTestClient()
        {
            WebApplicationFactory<Startup> _factory = new();
            return _factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureAppConfiguration((context, config) =>
                {
                    config.AddInMemoryCollection(new Dictionary<string, string>
                    {
                        ["ConnectionStrings:DefaultConnection"] = "DataSource=:memory:"
                    });
                });
            }).CreateClient();
        }
    }
}
