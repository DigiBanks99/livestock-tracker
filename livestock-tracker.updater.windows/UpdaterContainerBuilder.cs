using Autofac;

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
      builder.RegisterType<UpdaterService>().As<IUpdaterService>();

      return builder.Build();
    }
  }
}
