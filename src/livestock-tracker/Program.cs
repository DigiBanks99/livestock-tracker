using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;

namespace LivestockTracker
{
    /// <summary>
    /// Starts up the application.
    /// </summary>
    public static class Program
    {
        /// <summary>
        /// The main application entry-point
        /// </summary>
        /// <param name="args">
        /// Arguments passed in from the command-line or application bootstrap.
        /// </param>
        public static async Task Main(string[] args)
        {
            await CreateWebHostBuilder(args).Build()
                                            .RunAsync()
                                            .ConfigureAwait(true);
        }

        private static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                   .UseStartup<Startup>();
    }
}
