using Autofac;
using LivestockTracker.ProcessManager;
using LivestockTracker.Updater.Config;
using LivestockTracker.Updater.Windows.Config;
using LivestockTracker.Updater.Windows.Logging;
using LivestockTracker.Updater.Windows.Services;
using Serilog;
using Serilog.Formatting.Display;
using System;

namespace LivestockTracker.Updater.Windows
{
  public class UpdaterContainerBuilder
  {
    protected UpdaterContainerBuilder() { }

    public static IContainer RegisterComponents()
    {
      var builder = new ContainerBuilder();

      builder.UseSerilog(
        w => w.RollingFile(
          new MessageTemplateTextFormatter("{Timestamp:o} {RequestId,13} [{Level:u3}] {Message} ({EventId:x8}){NewLine}{Exception}", null),
          Environment.ExpandEnvironmentVariables("Log/log-{Date}.log")
          )
        );

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
  }
}
