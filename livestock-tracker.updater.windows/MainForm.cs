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
    private readonly ILogger _logger;
    private readonly IFileService _fileService;
    private readonly IUpdaterService _updaterService;
    private readonly IDownloadService _downloadService;
    private readonly CancellationTokenSource _cancellationTokenSource;
    private bool _downloading = false;
    private bool _updating = false;

    public MainForm(ILogger logger, IUpdaterService updaterService, IFileService fileService, IDownloadService downloadService)
    {
      logger.LogDebug("Constructing: {0}", nameof(MainForm));

      try
      {
        _logger = logger;
        _fileService = fileService;
        _updaterService = updaterService;
        _downloadService = downloadService;
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
    private async void MainForm_Load(object sender, EventArgs e)
    {
      _logger.LogDebug("Event: {0}, sender: {1}, e: {2}", nameof(MainForm_Load), sender, e);
      try
      {
        await InitializeForm();
      }
      catch (Exception ex)
      {
        _logger.LogCritical(ex, "Main form failed to load.");
        MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        this.Close();
      }
    }

    private async void buttonInstallPath_Click(object sender, EventArgs e)
    {
      _logger.LogDebug("Event: {0}, sender: {1}, e: {2}", nameof(buttonInstallPath_Click), sender, e);
      try
      {
        switch (folderBrowserDialog.ShowDialog())
        {
          case DialogResult.OK:
          case DialogResult.Yes:
            await SetupDataSource(folderBrowserDialog.SelectedPath);
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
        if (_downloading)
        {
          if (MessageBox.Show("Do you want to cancel the download?", "Cancel", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            _cancellationTokenSource.Cancel();
        }
        else if (_updating)
        {
          if (MessageBox.Show("Do you want to cancel the update?", "Cancel", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            _cancellationTokenSource.Cancel();
        }
        else
        {
          this.Close();
        }
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
        _downloading = true;
        await RequestDownload();
        buttonOk.Enabled = true;
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Download failed");
        MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        Application.Exit();
      }
      finally
      {
        _downloading = false;
      }
    }

    private void buttonOk_Click(object sender, EventArgs e)
    {
      _logger.LogDebug("Event: {0}, sender: {1}, e: {2}", nameof(buttonOk_Click), sender, e);
      try
      {
        _updating = true;
        StartUpdate();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Update failed");
        MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        Application.Exit();
      }
      finally
      {
        _updating = false;
      }
    }
    #endregion

    #region Privates
    private async Task InitializeForm()
    {
      SetupControlProperties();
      SetupImages();
      LocaliseControls();
      await SetupDataSource();
    }

    private async Task SetupDataSource(string installPath = null)
    {
      _logger.LogDebug("{0}: Setting up data source", nameof(MainForm));
      updaterModelBindingSource.SuspendBinding();
      updaterModelBindingSource.DataSource = await _updaterService.DetermineInitialUpdateInformation(installPath);
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
      _logger.LogDebug("{0}: Localising controls", nameof(MainForm));
#pragma warning disable S1854 // Dead stores should be removed
      var dummy = new UpdaterModel();
#pragma warning restore S1854 // Dead stores should be removed
      labelInstallPath.Text = nameof(dummy.InstallPath).SplitCamelCase();
      labelNewVersion.Text = nameof(dummy.NewVersionString).SplitCamelCase().Replace("String", "");
      labelOldVersion.Text = nameof(dummy.OldVersion).SplitCamelCase();
      labelOldFiles.Text = nameof(dummy.OldFiles).SplitCamelCase();
      labelNewFiles.Text = nameof(dummy.NewFiles).SplitCamelCase();
      labelStatus.Text = "Ready";
      buttonInstallPath.Text = "&Browse";
      buttonCancel.Text = _downloading || _updating ? "&Cancel" : "&Close";
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
      _logger.LogDebug("{0}: Setting up images", nameof(MainForm));
      SuspendLayout();
      treeViewOldFiles.ImageList = _fileService.GetFileImageList();
      treeViewOldFiles.StateImageList = _fileService.GetFileImageList();
      treeViewNewFiles.ImageList = _fileService.GetFileImageList();
      treeViewNewFiles.StateImageList = _fileService.GetFileImageList();
      ResumeLayout();
    }

    private void SetupControlProperties()
    {
      _logger.LogDebug("{0}: Setting up control properties", nameof(MainForm));
      textOldVersion.ReadOnly = true;
      textBoxNewVersion.ReadOnly = true;
      textBoxInstallPath.ReadOnly = true;

      progressBar.Maximum = 100;
      progressBar.Value = 0;

      buttonOk.Enabled = false;
    }

    private async Task RequestDownload()
    {
      var currentModel = updaterModelBindingSource.Current as UpdaterModel;
      if (currentModel != null && currentModel.OldVersion == currentModel.NewVersionString)
      {
        MessageBox.Show("You are already on the latest version.", "No Update", MessageBoxButtons.OK, MessageBoxIcon.Information);
        return;
      }

      if (MessageBox.Show("The livestock-tracker Update tool will download the latest version.", "Download", MessageBoxButtons.OK, MessageBoxIcon.Information) != DialogResult.OK)
        return;

      buttonDownload.Enabled = false;
      buttonOk.Enabled = false;
      buttonInstallPath.Enabled = false;
      buttonCancel.Text = "&Cancel";

      var newModel = await ManageDownload();
      UpdateDataSource(newModel);

      buttonDownload.Enabled = true;
      buttonOk.Enabled = true;
      buttonInstallPath.Enabled = true;
      buttonCancel.Text = "&Close";
    }

    private async Task<UpdaterModel> ManageDownload()
    {
      progressBar.Value = 0;
      UpdateStatus("Donwloading... 0%");
      var cancellationToken = _cancellationTokenSource.Token;
      var currentModel = this.updaterModelBindingSource.Current as UpdaterModel;
      var fileInfo = await DownloadNewFilesAsync(cancellationToken);
      if (!cancellationToken.IsCancellationRequested)
      {
        UpdateStatus("Donwloaded");
        return _updaterService.GetNewFiles(fileInfo, currentModel);
      }

      this.progressBar.Value = 0;
      ResetStatus();
      return new UpdaterModel
      {
        InstallPath = currentModel.InstallPath,
        NewVersionString = currentModel.NewVersionString,
        NewVersionModel = currentModel.NewVersionModel,
        NewFiles = Enumerable.Empty<TreeItem<string>>(),
        OldFiles = currentModel.OldFiles,
        OldVersion = currentModel.OldVersion
      };
    }

    private async Task<FileInfo> DownloadNewFilesAsync(CancellationToken cancellationToken)
    {
      var downloadsPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), Constants.SOLUTION_ENTRYPOINT_NAME, Constants.SOLUTION_DOWNLOADS_NAME);
      var downloadsDir = new DirectoryInfo(downloadsPath);
      if (!downloadsDir.Exists)
        downloadsDir.Create();

      var progress = new Progress<int>(value => {
        UpdateStatus($"Donwloading... {value}%");
        progressBar.Value = value;
      });

      var currentUpdaterModel = this.updaterModelBindingSource.Current as UpdaterModel;
      if (currentUpdaterModel == null)
      {
        progressBar.Value = 100;
        return null;
      }

      var downloadName = Path.Combine(downloadsDir.FullName, currentUpdaterModel.NewVersionModel.FileName);
      var downloadFileInfo = new FileInfo(downloadName);

      if (cancellationToken.IsCancellationRequested)
        return downloadFileInfo;

      if (!downloadFileInfo.Exists)
        await Task.Run(async () => await _downloadService.DownloadAsync(currentUpdaterModel.NewVersionModel, downloadFileInfo.FullName, progress, cancellationToken));
      else
        progressBar.Value = 100;

      return downloadFileInfo;
    }

    private void UpdateStatus(string message)
    {
      labelStatus.Text = message;
    }

    private void ResetStatus()
    {
      labelStatus.Text = "Ready";
    }

    private void StartUpdate()
    {
      var cancellationToken = _cancellationTokenSource.Token;
      var currentUpdaterModel = this.updaterModelBindingSource.Current as UpdaterModel;

      var progress = new Progress<int>(value => {
        UpdateStatus($"Updating... {value}%");
        progressBar.Value = value;
      });

      buttonDownload.Enabled = false;
      buttonOk.Enabled = false;
      buttonInstallPath.Enabled = false;
      buttonCancel.Text = "&Cancel";

      UpdateStatus("Updating... 0%");
      if (_updaterService.Update(currentUpdaterModel, progress, cancellationToken))
      {
        UpdateStatus("Updated.");
        MessageBox.Show("Update was successful. You may now run the application again.", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
      }
      else
        MessageBox.Show("Update failed. Please submit an issue and attach the log.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);

      buttonDownload.Enabled = true;
      buttonOk.Enabled = true;
      buttonInstallPath.Enabled = true;
      buttonCancel.Text = "&Close";
    }
    #endregion
  }
}
