using System.IO;
using System.Windows.Forms;

namespace LivestockTracker.Updater
{
  public partial class MainForm : Form
  {
    public MainForm()
    {
      InitializeComponent();

      var path = Path.Combine("C:\\", "sandbox", "livestock-tracker", "livestock-tracker.process-manager", "bin", "debug", "netstandard2.0", "livestock-tracker.process-manager.dll");
      var versionChecker = new ProcessManager.DotnetCoreAppVersionChecker(new FileInfo(path));
      MessageBox.Show(versionChecker.GetVersion());
    }
  }
}
