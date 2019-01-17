using Autofac;
using System;
using System.Windows.Forms;

namespace LivestockTracker.Updater
{
  internal static class Program
  {
    public static IContainer Container { get; set; }

    /// <summary>
    /// The main entry point for the application.
    /// </summary>
    [STAThread]
    private static void Main()
    {
      Container = UpdaterContainerBuilder.RegisterComponents();
      Application.EnableVisualStyles();
      Application.SetCompatibleTextRenderingDefault(false);
      Application.Run(new MainForm());
    }

    public static T ResolveDependency<T>()
    {
      using (var scope = Container.BeginLifetimeScope())
      {
        return scope.Resolve<T>();
      }
    }
  }
}
