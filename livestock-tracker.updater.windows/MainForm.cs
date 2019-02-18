using LivestockTracker.Base;
using LivestockTracker.Base.Extensions.System;
using LivestockTracker.Updater.Windows.Services;
using Microsoft.Extensions.Logging;
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
    private readonly ILogger _logger;

    public MainForm(IUpdaterService updaterService, IFileService fileService, ILogger logger)
    {
      try
      {
        _fileService = fileService;
        _updaterService = updaterService;
        _logger = logger;
        InitializeComponent();
      }
      catch (Exception ex)
      {
        _logger.LogCritical(ex, "Main form failed to create.");
        MessageBox.Show(ex.ToString(), "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        this.Close();
      }
    }

    #region Events
    private void MainForm_Load(object sender, EventArgs e)
    {
      try
      {
        InitializeForm();
      }
      catch (Exception ex)
      {
        _logger.LogCritical(ex, "Main form failed to load.");
        MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        this.Close();
      }
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
      SetupControlProperties();
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
      labelInstallPath.Text = nameof(dummy.InstallPath).SplitCamelCase();
      labelNewVersion.Text = nameof(dummy.NewVersion).SplitCamelCase();
      labelOldVersion.Text = nameof(dummy.OldVersion).SplitCamelCase();
      labelOldFiles.Text = nameof(dummy.OldFiles).SplitCamelCase();
      labelNewFiles.Text = nameof(dummy.NewFiles).SplitCamelCase();
      buttonInstallPath.Text = "&Browse";
      buttonCancel.Text = "&Cancel";
      buttonOk.Text = "&Update";
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

    private void SetupControlProperties()
    {
      textOldVersion.ReadOnly = true;
      textBoxNewVersion.ReadOnly = true;
      textBoxInstallPath.ReadOnly = true;
    }
    #endregion
  }
}
