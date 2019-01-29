namespace LivestockTracker.Updater.Windows
{
  partial class MainForm
  {
    /// <summary>
    /// Required designer variable.
    /// </summary>
    private System.ComponentModel.IContainer components = null;

    /// <summary>
    /// Clean up any resources being used.
    /// </summary>
    /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
    protected override void Dispose(bool disposing)
    {
      if (disposing && (components != null))
      {
        components.Dispose();
      }
      base.Dispose(disposing);
    }

    #region Windows Form Designer generated code

    /// <summary>
    /// Required method for Designer support - do not modify
    /// the contents of this method with the code editor.
    /// </summary>
    private void InitializeComponent()
    {
      this.components = new System.ComponentModel.Container();
      this.layoutMain = new System.Windows.Forms.FlowLayoutPanel();
      this.lcInstallPath = new System.Windows.Forms.Panel();
      this.buttonInstallPath = new System.Windows.Forms.Button();
      this.labelInstallPath = new System.Windows.Forms.Label();
      this.textBoxInstallPath = new System.Windows.Forms.TextBox();
      this.updaterModelBindingSource = new System.Windows.Forms.BindingSource(this.components);
      this.folderBrowserDialog = new System.Windows.Forms.FolderBrowserDialog();
      this.lcNewVersion = new System.Windows.Forms.Panel();
      this.labelNewVersion = new System.Windows.Forms.Label();
      this.textBoxNewVersion = new System.Windows.Forms.TextBox();
      this.lcOldVersion = new System.Windows.Forms.Panel();
      this.textOldVersion = new System.Windows.Forms.TextBox();
      this.labelOldVersion = new System.Windows.Forms.Label();
      this.panelOldFiles = new System.Windows.Forms.Panel();
      this.panel2 = new System.Windows.Forms.Panel();
      this.labelOldFiles = new System.Windows.Forms.Label();
      this.treeViewOldFiles = new System.Windows.Forms.TreeView();
      this.layoutMain.SuspendLayout();
      this.lcInstallPath.SuspendLayout();
      ((System.ComponentModel.ISupportInitialize)(this.updaterModelBindingSource)).BeginInit();
      this.lcNewVersion.SuspendLayout();
      this.lcOldVersion.SuspendLayout();
      this.panelOldFiles.SuspendLayout();
      this.SuspendLayout();
      // 
      // layoutMain
      // 
      this.layoutMain.Controls.Add(this.lcInstallPath);
      this.layoutMain.Controls.Add(this.lcOldVersion);
      this.layoutMain.Controls.Add(this.lcNewVersion);
      this.layoutMain.Controls.Add(this.panelOldFiles);
      this.layoutMain.Controls.Add(this.panel2);
      this.layoutMain.Dock = System.Windows.Forms.DockStyle.Fill;
      this.layoutMain.FlowDirection = System.Windows.Forms.FlowDirection.TopDown;
      this.layoutMain.Location = new System.Drawing.Point(0, 0);
      this.layoutMain.Name = "layoutMain";
      this.layoutMain.Size = new System.Drawing.Size(800, 467);
      this.layoutMain.TabIndex = 0;
      // 
      // lcInstallPath
      // 
      this.lcInstallPath.Controls.Add(this.buttonInstallPath);
      this.lcInstallPath.Controls.Add(this.labelInstallPath);
      this.lcInstallPath.Controls.Add(this.textBoxInstallPath);
      this.lcInstallPath.Location = new System.Drawing.Point(3, 3);
      this.lcInstallPath.Name = "lcInstallPath";
      this.lcInstallPath.Size = new System.Drawing.Size(797, 36);
      this.lcInstallPath.TabIndex = 0;
      // 
      // buttonInstallPath
      // 
      this.buttonInstallPath.Location = new System.Drawing.Point(710, 6);
      this.buttonInstallPath.Name = "buttonInstallPath";
      this.buttonInstallPath.Size = new System.Drawing.Size(75, 23);
      this.buttonInstallPath.TabIndex = 2;
      this.buttonInstallPath.Text = "buttonBrowseInstallPath";
      this.buttonInstallPath.UseVisualStyleBackColor = true;
      this.buttonInstallPath.Click += new System.EventHandler(this.buttonInstallPath_Click);
      // 
      // labelInstallPath
      // 
      this.labelInstallPath.AutoSize = true;
      this.labelInstallPath.Location = new System.Drawing.Point(9, 11);
      this.labelInstallPath.Name = "labelInstallPath";
      this.labelInstallPath.Size = new System.Drawing.Size(78, 13);
      this.labelInstallPath.TabIndex = 1;
      this.labelInstallPath.Text = "labelInstallPath";
      // 
      // textBoxInstallPath
      // 
      this.textBoxInstallPath.DataBindings.Add(new System.Windows.Forms.Binding("Text", this.updaterModelBindingSource, "InstallPath", true));
      this.textBoxInstallPath.Location = new System.Drawing.Point(128, 8);
      this.textBoxInstallPath.Name = "textBoxInstallPath";
      this.textBoxInstallPath.Size = new System.Drawing.Size(576, 20);
      this.textBoxInstallPath.TabIndex = 0;
      // 
      // updaterModelBindingSource
      // 
      this.updaterModelBindingSource.DataSource = typeof(LivestockTracker.Updater.UpdaterModel);
      // 
      // folderBrowserDialog
      // 
      this.folderBrowserDialog.Description = "Installation Path";
      // 
      // lcNewVersion
      // 
      this.lcNewVersion.Controls.Add(this.textBoxNewVersion);
      this.lcNewVersion.Controls.Add(this.labelNewVersion);
      this.lcNewVersion.Location = new System.Drawing.Point(3, 87);
      this.lcNewVersion.Name = "lcNewVersion";
      this.lcNewVersion.Size = new System.Drawing.Size(797, 36);
      this.lcNewVersion.TabIndex = 1;
      // 
      // labelNewVersion
      // 
      this.labelNewVersion.AutoSize = true;
      this.labelNewVersion.Location = new System.Drawing.Point(9, 9);
      this.labelNewVersion.Name = "labelNewVersion";
      this.labelNewVersion.Size = new System.Drawing.Size(86, 13);
      this.labelNewVersion.TabIndex = 0;
      this.labelNewVersion.Text = "labelNewVersion";
      // 
      // textBoxNewVersion
      // 
      this.textBoxNewVersion.DataBindings.Add(new System.Windows.Forms.Binding("Text", this.updaterModelBindingSource, "NewVersion", true));
      this.textBoxNewVersion.Location = new System.Drawing.Point(128, 9);
      this.textBoxNewVersion.Name = "textBoxNewVersion";
      this.textBoxNewVersion.Size = new System.Drawing.Size(657, 20);
      this.textBoxNewVersion.TabIndex = 1;
      // 
      // lcOldVersion
      // 
      this.lcOldVersion.Controls.Add(this.textOldVersion);
      this.lcOldVersion.Controls.Add(this.labelOldVersion);
      this.lcOldVersion.Location = new System.Drawing.Point(3, 45);
      this.lcOldVersion.Name = "lcOldVersion";
      this.lcOldVersion.Size = new System.Drawing.Size(797, 36);
      this.lcOldVersion.TabIndex = 2;
      // 
      // textOldVersion
      // 
      this.textOldVersion.DataBindings.Add(new System.Windows.Forms.Binding("Text", this.updaterModelBindingSource, "OldVersion", true));
      this.textOldVersion.Location = new System.Drawing.Point(128, 9);
      this.textOldVersion.Name = "textOldVersion";
      this.textOldVersion.Size = new System.Drawing.Size(657, 20);
      this.textOldVersion.TabIndex = 1;
      // 
      // labelOldVersion
      // 
      this.labelOldVersion.AutoSize = true;
      this.labelOldVersion.Location = new System.Drawing.Point(9, 9);
      this.labelOldVersion.Name = "labelOldVersion";
      this.labelOldVersion.Size = new System.Drawing.Size(80, 13);
      this.labelOldVersion.TabIndex = 0;
      this.labelOldVersion.Text = "labelOldVersion";
      // 
      // panelOldFiles
      // 
      this.panelOldFiles.Controls.Add(this.treeViewOldFiles);
      this.panelOldFiles.Controls.Add(this.labelOldFiles);
      this.panelOldFiles.Location = new System.Drawing.Point(3, 129);
      this.panelOldFiles.Name = "panelOldFiles";
      this.panelOldFiles.Size = new System.Drawing.Size(797, 265);
      this.panelOldFiles.TabIndex = 3;
      // 
      // panel2
      // 
      this.panel2.Dock = System.Windows.Forms.DockStyle.Bottom;
      this.panel2.Location = new System.Drawing.Point(806, 3);
      this.panel2.Name = "panel2";
      this.panel2.Size = new System.Drawing.Size(0, 100);
      this.panel2.TabIndex = 4;
      // 
      // labelOldFiles
      // 
      this.labelOldFiles.AutoSize = true;
      this.labelOldFiles.Location = new System.Drawing.Point(10, 13);
      this.labelOldFiles.Name = "labelOldFiles";
      this.labelOldFiles.Size = new System.Drawing.Size(66, 13);
      this.labelOldFiles.TabIndex = 0;
      this.labelOldFiles.Text = "labelOldFiles";
      // 
      // treeViewOldFiles
      // 
      this.treeViewOldFiles.Location = new System.Drawing.Point(13, 30);
      this.treeViewOldFiles.Name = "treeViewOldFiles";
      this.treeViewOldFiles.Size = new System.Drawing.Size(772, 219);
      this.treeViewOldFiles.TabIndex = 1;
      // 
      // MainForm
      // 
      this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.ClientSize = new System.Drawing.Size(800, 467);
      this.Controls.Add(this.layoutMain);
      this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
      this.MaximizeBox = false;
      this.Name = "MainForm";
      this.SizeGripStyle = System.Windows.Forms.SizeGripStyle.Hide;
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
      this.Text = "MainForm";
      this.Load += new System.EventHandler(this.MainForm_Load);
      this.layoutMain.ResumeLayout(false);
      this.lcInstallPath.ResumeLayout(false);
      this.lcInstallPath.PerformLayout();
      ((System.ComponentModel.ISupportInitialize)(this.updaterModelBindingSource)).EndInit();
      this.lcNewVersion.ResumeLayout(false);
      this.lcNewVersion.PerformLayout();
      this.lcOldVersion.ResumeLayout(false);
      this.lcOldVersion.PerformLayout();
      this.panelOldFiles.ResumeLayout(false);
      this.panelOldFiles.PerformLayout();
      this.ResumeLayout(false);

    }

    #endregion

    private System.Windows.Forms.FlowLayoutPanel layoutMain;
    private System.Windows.Forms.Panel lcInstallPath;
    private System.Windows.Forms.Button buttonInstallPath;
    private System.Windows.Forms.Label labelInstallPath;
    private System.Windows.Forms.TextBox textBoxInstallPath;
    private System.Windows.Forms.BindingSource updaterModelBindingSource;
    private System.Windows.Forms.FolderBrowserDialog folderBrowserDialog;
    private System.Windows.Forms.Panel lcNewVersion;
    private System.Windows.Forms.TextBox textBoxNewVersion;
    private System.Windows.Forms.Label labelNewVersion;
    private System.Windows.Forms.Panel lcOldVersion;
    private System.Windows.Forms.TextBox textOldVersion;
    private System.Windows.Forms.Label labelOldVersion;
    private System.Windows.Forms.Panel panelOldFiles;
    private System.Windows.Forms.TreeView treeViewOldFiles;
    private System.Windows.Forms.Label labelOldFiles;
    private System.Windows.Forms.Panel panel2;
  }
}

