using System;
using System.Windows.Forms;

namespace LivestockTracker.Updater.Windows
{
  public partial class MainForm : Form
  {
    private readonly IUpdaterService _updaterService;

    public MainForm(IUpdaterService updaterService)
    {
      _updaterService = updaterService;
      InitializeComponent();
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
