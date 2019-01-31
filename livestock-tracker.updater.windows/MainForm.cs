using LivestockTracker.Base;
using LivestockTracker.Updater.Windows.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows.Forms;

namespace LivestockTracker.Updater.Windows
{
  public partial class MainForm : Form
  {
    private readonly IFileService _fileService;
    private readonly IUpdaterService _updaterService;

    public MainForm(IUpdaterService updaterService, IFileService fileService)
    {
      _fileService = fileService;
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
      SetupImages();
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
#pragma warning disable S1854 // Dead stores should be removed
      var dummy = new UpdaterModel();
#pragma warning restore S1854 // Dead stores should be removed
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

      var parentNodes = updaterModel.OldFiles.Where(x => string.IsNullOrEmpty(x.Parent));
      foreach (var file in parentNodes)
      {
        if (file.Parent != null)
          continue;

        var parentNode = new TreeNode(file.Value);
        parentNode.Tag = file.Value;
        parentNode.ImageKey = _fileService.GetFileTypeImageIndex(null);
        AppendChildNodes(parentNode, updaterModel.OldFiles);
        treeViewOldFiles.Nodes.Add(parentNode);
      }
    }

    private void AppendChildNodes(TreeNode parent, IEnumerable<TreeItem<string>> oldFiles)
    {
      foreach (var file in oldFiles)
      {
        if (file.Parent != (string)parent.Tag)
          continue;

        var fileInfo = new FileInfo(file.Value);
        var childNode = new TreeNode(fileInfo.Name);
        childNode.Tag = fileInfo.FullName;
        childNode.ImageKey = _fileService.GetFileTypeImageIndex(fileInfo.Extension);
        AppendChildNodes(childNode, oldFiles);
        parent.Nodes.Add(childNode);
      }
    }

    private void SetupImages()
    {
      SuspendLayout();
      treeViewOldFiles.ImageList = _fileService.GetFileImageList();
      treeViewOldFiles.StateImageList = _fileService.GetFileImageList();
      ResumeLayout();
    }
    #endregion
  }
}
