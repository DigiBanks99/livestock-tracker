using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace LivestockTracker
{
  public static class Program
  {
    public static void Main(string[] args)
    {
      CreateWebHostBuilder(args).Build().Run();
    }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
            .ConfigureAppConfiguration((context, config) =>
            {
              var environmentSwitch = context.HostingEnvironment.IsProduction() ? string.Empty : $".{context.HostingEnvironment.EnvironmentName}";
              config.AddJsonFile($"appsettings{environmentSwitch}.json", optional: false, reloadOnChange: true);
            })
            .UseStartup<Startup>();
  }
}
