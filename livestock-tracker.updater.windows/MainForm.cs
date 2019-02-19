using LivestockTracker.Base;
using LivestockTracker.Updater.Windows.Services;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace LivestockTracker.Updater.Windows
{
  public partial class MainForm : Form
  {
    private readonly IFileService _fileService;
    private readonly IUpdaterService _updaterService;
    private readonly ILogger _logger;
    private readonly CancellationTokenSource _cancellationTokenSource;

    public MainForm(IUpdaterService updaterService, IFileService fileService, ILogger logger)
    {
      try
      {
        _fileService = fileService;
        _updaterService = updaterService;
        _logger = logger;
        _cancellationTokenSource = new CancellationTokenSource();
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
      _logger.LogDebug("Event: {0}, sender: {1}, e: {2}", nameof(MainForm_Load), sender, e);
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
      _logger.LogDebug("Event: {0}, sender: {1}, e: {2}", nameof(buttonInstallPath_Click), sender, e);
      try
      {
        switch (folderBrowserDialog.ShowDialog())
        {
          case DialogResult.OK:
          case DialogResult.Yes:
            SetupDataSource(folderBrowserDialog.SelectedPath);
            return;
          default:
            return;
        }
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Unable to set install path.");
        MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
      }
    }

    private void buttonCancel_Click(object sender, EventArgs e)
    {
      _logger.LogDebug("Event: {0}, sender: {1}, e: {2}", nameof(buttonCancel_Click), sender, e);
      try
      {
        this.Close();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Failed to close application gracefully.");
        MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        Application.Exit();
      }
    }

    private async void buttonDownload_Click(object sender, EventArgs e)
    {
      _logger.LogDebug("Event: {0}, sender: {1}, e: {2}", nameof(buttonDownload_Click), sender, e);
      try
      {
        await RequestDownload();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Retrieving new files failed");
        MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        Application.Exit();
      }
    }
    #endregion

    #region Privates
    private void InitializeForm()
    {
      SetupControlProperties();
      SetupImages();
      LocaliseControls();
      SetupDataSource();
    }

    private void SetupDataSource(string installPath = null)
    {
      updaterModelBindingSource.SuspendBinding();
      updaterModelBindingSource.DataSource = _updaterService.DetermineInitialUpdateInformation(installPath);
      PopulateOldFiles();
      updaterModelBindingSource.ResumeBinding();
      updaterModelBindingSource.ResetBindings(true);
    }

    private void UpdateDataSource(UpdaterModel model)
    {
      updaterModelBindingSource.SuspendBinding();
      updaterModelBindingSource.DataSource = model;
      PopulateOldFiles();
      PopulateNewFiles();
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
      buttonDownload.Text = "&Download";
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

    private void PopulateNewFiles()
    {
      treeViewNewFiles.Nodes.Clear();
      var updaterModel = updaterModelBindingSource.Current as UpdaterModel;
      if (updaterModel == null)
        return;

      var parentNodes = updaterModel.NewFiles.Where(x => string.IsNullOrEmpty(x.Parent));
      foreach (var file in parentNodes)
      {
        if (file.Parent != null)
          continue;

        var parentNode = new TreeNode(file.Value);
        parentNode.Tag = file.Value;
        parentNode.ImageKey = _fileService.GetFileTypeImageIndex(null);
        AppendChildNodes(parentNode, updaterModel.NewFiles);
        treeViewNewFiles.Nodes.Add(parentNode);
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
      treeViewNewFiles.ImageList = _fileService.GetFileImageList();
      treeViewNewFiles.StateImageList = _fileService.GetFileImageList();
      ResumeLayout();
    }

    private void SetupControlProperties()
    {
      textOldVersion.ReadOnly = true;
      textBoxNewVersion.ReadOnly = true;
      textBoxInstallPath.ReadOnly = true;

      progressBar.Maximum = 100;
      SetProgressBarValue(0);
    }

    private async Task RequestDownload()
    {
      if (MessageBox.Show("The livestock-tracker Update tool will download the latest version.", "Download", MessageBoxButtons.OK, MessageBoxIcon.Information) != DialogResult.OK)
        return;

      buttonDownload.Enabled = false;
      buttonOk.Enabled = false;
      buttonInstallPath.Enabled = false;

      SetProgressBarValue(0);
      var newModel = await ManageDownload();
      UpdateDataSource(newModel);

      buttonDownload.Enabled = true;
      buttonOk.Enabled = true;
      buttonInstallPath.Enabled = true;
    }

    private async Task<UpdaterModel> ManageDownload()
    {
      var cancellationToken = _cancellationTokenSource.Token;
      var fileInfo = await DownloadNewFilesAsync(cancellationToken);
      return _updaterService.GetNewFiles(fileInfo, this.updaterModelBindingSource.Current as UpdaterModel);
    }

    private async Task<FileInfo> DownloadNewFilesAsync(CancellationToken cancellationToken)
    {
      var downloadsPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), Constants.SOLUTION_ENTRYPOINT_NAME, Constants.SOLUTION_DOWNLOADS_NAME);
      var downloadsDir = new DirectoryInfo(downloadsPath);
      if (!downloadsDir.Exists)
        downloadsDir.Create();

      var progress = new Progress<int>(value => progressBar.Value = value);
      var currentUpdaterModel = this.updaterModelBindingSource.Current as UpdaterModel;
      if (currentUpdaterModel == null)
      {
        SetProgressBarValue(100);
        return null;
      }

      var downloadName = Path.Combine(downloadsDir.FullName, currentUpdaterModel.NewVersionName);
      var fileInfo = new FileInfo(downloadName);

      if (cancellationToken.IsCancellationRequested)
        return fileInfo;

      if (!fileInfo.Exists)
        await Task.Run(async () => await _updaterService.DownloadAsync(currentUpdaterModel.NewVersionName, fileInfo.FullName, progress, cancellationToken));
      else
        SetProgressBarValue(100);

      return fileInfo;
    }

    private void SetProgressBarValue(int value)
    {
      progressBar.Invoke((MethodInvoker)(() =>
      {
        progressBar.Value = value;
      }));
    }
    #endregion
  }
}
