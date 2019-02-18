using Autofac;
using Microsoft.Extensions.Logging;
using System;
using System.Windows.Forms;

namespace LivestockTracker.Updater.Windows
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
      ILogger logger = null;
      try
      {
        Container = UpdaterContainerBuilder.RegisterComponents();
        logger = Container.Resolve<ILogger>();
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);
        Application.Run(Container.Resolve<MainForm>());
      }
      catch (Exception ex)
      {
        if (logger != null)
          logger.LogCritical(ex, "System crash.");
        MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
      }
    }
  }
}
