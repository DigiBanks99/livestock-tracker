using Autofac;
using LivestockTracker.Updater.Windows.Services;

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

      builder.RegisterType<MainForm>();
      builder.RegisterType<FileService>().As<IFileService>();
      builder.RegisterType<UpdaterService>().As<IUpdaterService>();

      return builder.Build();
    }
  }
}
