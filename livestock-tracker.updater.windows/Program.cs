using Autofac;
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
      try
      {
        Container = UpdaterContainerBuilder.RegisterComponents();
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);
        Application.Run(Container.Resolve<MainForm>());
      }
      catch (Exception ex)
      {
        MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
      }
    }
  }
}
