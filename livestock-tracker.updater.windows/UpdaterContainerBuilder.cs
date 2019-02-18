using Autofac;
using LivestockTracker.Base;
using LivestockTracker.Updater.Windows.Services;
using Microsoft.Extensions.Logging;
using Serilog;
using System.Linq;
using System;
using ILogger = Microsoft.Extensions.Logging.ILogger;
using LivestockTracker.Updater.Windows.Config;
using LivestockTracker.Updater.Config;

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

      builder.RegisterType<MainForm>();
      builder.RegisterType<FileService>().As<IFileService>();
      builder.RegisterType<FtpConfig>().As<IFtpConfig>();
      builder.RegisterType<UpdaterService>().As<IUpdaterService>();
      builder.RegisterInstance(loggerInstance);

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
        new Serilog.Formatting.Display.MessageTemplateTextFormatter("{Timestamp:o} {RequestId,13} [{Level:u3}] {Message} ({EventId:x8}){NewLine}{Exception}", null),
        Environment.ExpandEnvironmentVariables("Log/log-{Date}.log")));

      return configuration.CreateLogger();
    }
  }
}
