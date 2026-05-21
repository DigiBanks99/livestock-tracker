using LivestockTracker.ProcessManager;
using LivestockTracker.Updater.Config;
using LivestockTracker.Updater.Windows.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;

namespace LivestockTracker.Updater.Windows;

internal static class Program
{
    [STAThread]
    public static void Main(string[] args)
    {
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
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
                var configuration = hostBuilder.Configuration;

                services.AddScoped<MainForm>();
                services.Configure<ApplicationConfig>(configuration.GetSection(ApplicationConfig.Key));
                services.Configure<ApiConfig>(configuration.GetSection(ApiConfig.Key));
                services.Configure<FtpConfig>(configuration.GetSection(FtpConfig.Key));
                services.AddScoped<IDownloadService, ApiDownloadService>();
                services.AddScoped<IFileService, FileService>();
                services.AddScoped<IFileCopyService, FileCopyService>();
                services.AddScoped<IUpdaterService, UpdaterService>();
                services.AddScoped<IProcessManager, ProcessManager.ProcessManager>();
            })
            .UseSerilog((hostingContext, loggerConfiguration) =>
                loggerConfiguration.ReadFrom.Configuration(hostingContext.Configuration));

    private static void Start(IServiceProvider serviceProvider)
    {
        Application.SetHighDpiMode(HighDpiMode.SystemAware);
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);
        Application.Run(serviceProvider.GetService<MainForm>());
    }
}
