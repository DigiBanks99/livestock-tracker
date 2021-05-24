using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;
using System;
using System.Windows.Forms;

namespace LivestockTracker.Updater.Windows
{
  internal static class Program
  {

    /// <summary>
    /// The main entry point for the application.
    /// </summary>
    [STAThread]
    public static void Main(string[] args)
    {

      Log.Logger = new LoggerConfiguration().MinimumLevel
                                            .Override("Microsoft", LogEventLevel.Information)
                                            .Enrich.FromLogContext()
                                            .WriteTo.Console()
                                            .CreateLogger();
      try
      {
        var host = CreateHostBuilder(args).Build();

        using var scope = host.Services.CreateScope();
        Start(scope.ServiceProvider);
      }
      catch (Exception ex)
      {
        Log.Logger.Error(ex, "System crash.");

        MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
      }
    }

    private static IHostBuilder CreateHostBuilder(string[] args) =>
      Host.CreateDefaultBuilder(args)
          .ConfigureServices((hostBuilder, services) =>
          {
            var startup = new Startup(hostBuilder.Configuration);
            startup.ConfigureServices(services);
          })
          .UseSerilog((hostingContext, loggerConfiguration) => loggerConfiguration.ReadFrom
                                                                                  .Configuration(hostingContext.Configuration));

    private static void Start(IServiceProvider serviceProvider)
    {
      Application.SetHighDpiMode(HighDpiMode.SystemAware);
      Application.EnableVisualStyles();
      Application.SetCompatibleTextRenderingDefault(false);
      Application.Run(serviceProvider.GetService<MainForm>());
    }
  }
}
