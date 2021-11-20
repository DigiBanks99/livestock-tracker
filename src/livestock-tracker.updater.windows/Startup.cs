using LivestockTracker.ProcessManager;
using LivestockTracker.Updater.Config;
using LivestockTracker.Updater.Windows.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LivestockTracker.Updater.Windows
{
  internal class Startup
  {
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    public IServiceCollection ConfigureServices(IServiceCollection services)
    {
      services.AddScoped<MainForm>();

      services.Configure<ApplicationConfig>(_configuration.GetSection(ApplicationConfig.Key));
      services.Configure<ApiConfig>(_configuration.GetSection(ApiConfig.Key));
      services.Configure<FtpConfig>(_configuration.GetSection(FtpConfig.Key));

      services.AddScoped<IDownloadService, ApiDownloadService>();
      services.AddScoped<IFileService, FileService>();
      services.AddScoped<IFileCopyService, FileCopyService>();
      services.AddScoped<IUpdaterService, UpdaterService>();
      services.AddScoped<IProcessManager, ProcessManager.ProcessManager>();

      return services;
    }
  }
}
