using Autofac;
using LivestockTracker.Base;
using LivestockTracker.ProcessManager;
using LivestockTracker.Updater.Config;
using LivestockTracker.Updater.Windows.Config;
using LivestockTracker.Updater.Windows.Services;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Formatting.Display;
using System;
using ILogger = Microsoft.Extensions.Logging.ILogger;

namespace LivestockTracker.Updater.Windows
{
  public class UpdaterContainerBuilder
  {
    protected UpdaterContainerBuilder()
    {

    }

    public static IContainer RegisterComponents()
    {
      var builder = new ContainerBuilder();

      var loggerInstance = SetupLogger();

      builder.RegisterInstance(loggerInstance).As<ILogger>();
      builder.RegisterType<MainForm>();
      builder.RegisterType<FtpConfig>().As<IFtpConfig>();
      builder.RegisterType<ApiConfig>().As<IApiConfig>();
      builder.RegisterType<ApplicationConfig>().As<IApplicationConfig>();
      builder.RegisterType<ApiDonwloadService>().As<IDownloadService>();
      builder.RegisterType<FileService>().As<IFileService>();
      builder.RegisterType<FileCopyService>().As<IFileCopyService>();
      builder.RegisterType<UpdaterService>().As<IUpdaterService>();
      builder.RegisterType<ProcessManager.ProcessManager>().As<IProcessManager>();

      return builder.Build();
    }

    private static ILogger SetupLogger()
    {
      ILoggerFactory loggerFactory = new LoggerFactory();
      var logger = loggerFactory.CreateLogger(Constants.SOLUTION_ENTRYPOINT_NAME);
      SetupSeriLogger(loggerFactory);
      return logger;
    }

    private static void SetupSeriLogger(ILoggerFactory loggerFactory)
    {
      var seriLogger = CreateLogger();
      loggerFactory.AddSerilog(seriLogger);
    }

    private static Serilog.Core.Logger CreateLogger()
    {
      var configuration = new LoggerConfiguration()
        .ReadFrom.AppSettings()
        .Enrich.FromLogContext()
        .WriteTo.Async(w => w.RollingFile(
          new MessageTemplateTextFormatter("{Timestamp:o} {RequestId,13} [{Level:u3}] {Message} ({EventId:x8}){NewLine}{Exception}", null),
          Environment.ExpandEnvironmentVariables("Log/log-{Date}.log"))
        );

      return configuration.CreateLogger();
    }
  }
}
