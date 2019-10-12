using Autofac;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Configuration;
using Serilog.Core;
using System;
using Constants = LivestockTracker.Base.Constants;
using ILogger = Microsoft.Extensions.Logging.ILogger;

namespace LivestockTracker.Updater.Windows.Logging
{
  public static class SerilogMiddleware
  {
    public static ContainerBuilder UseSerilog(this ContainerBuilder builder, Action<LoggerSinkConfiguration> action)
    {
      ILoggerFactory loggerFactory = new LoggerFactory();
      var loggerInstance = loggerFactory.CreateLogger(Constants.SOLUTION_ENTRYPOINT_NAME);
      loggerFactory.AddSerilog(CreateLogger(action));

      builder.RegisterInstance(loggerInstance).As<ILogger>();
      return builder;
    }

    public static Logger CreateLogger(Action<LoggerSinkConfiguration> action)
    {
      var configuration = new LoggerConfiguration()
        .ReadFrom.AppSettings()
        .Enrich.FromLogContext()
        .WriteTo.Async(action);

      return configuration.CreateLogger();
    }
  }
}
