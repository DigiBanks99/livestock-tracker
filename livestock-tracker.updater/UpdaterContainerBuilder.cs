using Autofac;

namespace LivestockTracker.Updater
{
  public class UpdaterContainerBuilder
  {
    protected UpdaterContainerBuilder()
    {

    }

    public static IContainer RegisterComponents()
    {
      var builder = new ContainerBuilder();

      builder.RegisterType<UpdaterService>().As<IUpdaterService>();

      return builder.Build();
    }
  }
}
