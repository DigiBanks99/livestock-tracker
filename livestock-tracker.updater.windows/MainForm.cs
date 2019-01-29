using LivestockTracker.Base;
using System;
using System.Collections.Generic;
using System.Linq;
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
      LocaliseControls();
    }

    private void SetupDataSource()
    {
      updaterModelBindingSource.SuspendBinding();
      updaterModelBindingSource.DataSource = _updaterService.DetermineInitialUpdateInformation();
      PopulateOldFiles();
      updaterModelBindingSource.ResumeBinding();
      updaterModelBindingSource.ResetBindings(true);
    }

    private void LocaliseControls()
    {
      var dummy = new UpdaterModel();
      labelInstallPath.Text = nameof(dummy.InstallPath);
      labelNewVersion.Text = nameof(dummy.NewVersion);
      labelOldVersion.Text = nameof(dummy.OldVersion);
      labelOldFiles.Text = nameof(dummy.OldFiles);
      buttonInstallPath.Text = "Browse";
    }

    private void PopulateOldFiles()
    {
      treeViewOldFiles.Nodes.Clear();
      var updaterModel = updaterModelBindingSource.Current as UpdaterModel;
      if (updaterModel == null)
        return;

      var parentNode = new TreeNode("Initial");
      foreach (var file in updaterModel.OldFiles)
      {
        if (file.Parent == parentNode.Text)
          continue;

        parentNode = new TreeNode(file.Parent);
        AppendChildNodes(parentNode, updaterModel.OldFiles);
        treeViewOldFiles.Nodes.Add(parentNode);
      }
    }

    private void AppendChildNodes(TreeNode parent, IEnumerable<TreeItem<string>> oldFiles)
    {
      foreach (var file in oldFiles)
      {
        if (file.Parent != parent.Text)
          continue;

        var childNode = new TreeNode(file.Value);
        AppendChildNodes(childNode, oldFiles);
        parent.Nodes.Add(childNode);
      }
    }
    #endregion
  }
}
