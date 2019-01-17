using System;
using System.IO;
using System.Windows.Forms;

namespace LivestockTracker.Updater
{
  public partial class MainForm : Form
  {
    private readonly IUpdaterService _updaterService;

    public MainForm()
    {
      InitializeComponent();
      _updaterService = Program.ResolveDependency<IUpdaterService>();
    }

    #region Events
    private void MainForm_Load(object sender, EventArgs e)
    {
      InitializeForm();
    }

    private void buttonInstallPath_Click(object sender, EventArgs e)
    {
      folderBrowserDialog.ShowDialog();
    }
    #endregion

    #region Privates
    private void InitializeForm()
    {
      SetupDataSource();
    }

    private void SetupDataSource()
    {
      updaterModelBindingSource.SuspendBinding();
      updaterModelBindingSource.DataSource = _updaterService.DetermineInitialUpdateInformation();
      updaterModelBindingSource.ResumeBinding();
      updaterModelBindingSource.ResetBindings(true);
    }
    #endregion
  }
}
