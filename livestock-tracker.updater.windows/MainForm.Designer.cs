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
      this.lcOldVersion = new System.Windows.Forms.Panel();
      this.textOldVersion = new System.Windows.Forms.TextBox();
      this.labelOldVersion = new System.Windows.Forms.Label();
      this.lcNewVersion = new System.Windows.Forms.Panel();
      this.textBoxNewVersion = new System.Windows.Forms.TextBox();
      this.labelNewVersion = new System.Windows.Forms.Label();
      this.lcOldFiles = new System.Windows.Forms.Panel();
      this.treeViewOldFiles = new System.Windows.Forms.TreeView();
      this.labelOldFiles = new System.Windows.Forms.Label();
      this.folderBrowserDialog = new System.Windows.Forms.FolderBrowserDialog();
      this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
      this.panel2 = new System.Windows.Forms.Panel();
      this.lcNewFiles = new System.Windows.Forms.Panel();
      this.labelNewFiles = new System.Windows.Forms.Label();
      this.treeViewNewFiles = new System.Windows.Forms.TreeView();
      this.buttonCancel = new System.Windows.Forms.Button();
      this.buttonOk = new System.Windows.Forms.Button();
      this.layoutMain.SuspendLayout();
      this.lcInstallPath.SuspendLayout();
      ((System.ComponentModel.ISupportInitialize)(this.updaterModelBindingSource)).BeginInit();
      this.lcOldVersion.SuspendLayout();
      this.lcNewVersion.SuspendLayout();
      this.lcOldFiles.SuspendLayout();
      this.tableLayoutPanel1.SuspendLayout();
      this.panel2.SuspendLayout();
      this.lcNewFiles.SuspendLayout();
      this.SuspendLayout();
      // 
      // layoutMain
      // 
      this.layoutMain.Controls.Add(this.lcInstallPath);
      this.layoutMain.Controls.Add(this.tableLayoutPanel1);
      this.layoutMain.Controls.Add(this.panel2);
      this.layoutMain.Dock = System.Windows.Forms.DockStyle.Fill;
      this.layoutMain.FlowDirection = System.Windows.Forms.FlowDirection.TopDown;
      this.layoutMain.Location = new System.Drawing.Point(0, 0);
      this.layoutMain.Name = "layoutMain";
      this.layoutMain.Size = new System.Drawing.Size(808, 375);
      this.layoutMain.TabIndex = 0;
      // 
      // lcInstallPath
      // 
      this.lcInstallPath.AutoSize = true;
      this.lcInstallPath.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
      this.lcInstallPath.Controls.Add(this.labelInstallPath);
      this.lcInstallPath.Controls.Add(this.buttonInstallPath);
      this.lcInstallPath.Controls.Add(this.textBoxInstallPath);
      this.lcInstallPath.Location = new System.Drawing.Point(3, 3);
      this.lcInstallPath.Name = "lcInstallPath";
      this.lcInstallPath.Size = new System.Drawing.Size(797, 32);
      this.lcInstallPath.TabIndex = 0;
      // 
      // buttonInstallPath
      // 
      this.buttonInstallPath.Location = new System.Drawing.Point(710, 6);
      this.buttonInstallPath.Name = "buttonInstallPath";
      this.buttonInstallPath.Size = new System.Drawing.Size(84, 23);
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
      // lcOldVersion
      // 
      this.lcOldVersion.AutoSize = true;
      this.lcOldVersion.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
      this.lcOldVersion.Controls.Add(this.textOldVersion);
      this.lcOldVersion.Controls.Add(this.labelOldVersion);
      this.lcOldVersion.Location = new System.Drawing.Point(3, 3);
      this.lcOldVersion.Name = "lcOldVersion";
      this.lcOldVersion.Size = new System.Drawing.Size(394, 29);
      this.lcOldVersion.TabIndex = 2;
      // 
      // textOldVersion
      // 
      this.textOldVersion.DataBindings.Add(new System.Windows.Forms.Binding("Text", this.updaterModelBindingSource, "OldVersion", true));
      this.textOldVersion.Location = new System.Drawing.Point(125, 6);
      this.textOldVersion.Name = "textOldVersion";
      this.textOldVersion.Size = new System.Drawing.Size(266, 20);
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
      // lcNewVersion
      // 
      this.lcNewVersion.AutoSize = true;
      this.lcNewVersion.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
      this.lcNewVersion.Controls.Add(this.textBoxNewVersion);
      this.lcNewVersion.Controls.Add(this.labelNewVersion);
      this.lcNewVersion.Location = new System.Drawing.Point(403, 3);
      this.lcNewVersion.Name = "lcNewVersion";
      this.lcNewVersion.Size = new System.Drawing.Size(394, 29);
      this.lcNewVersion.TabIndex = 1;
      // 
      // textBoxNewVersion
      // 
      this.textBoxNewVersion.DataBindings.Add(new System.Windows.Forms.Binding("Text", this.updaterModelBindingSource, "NewVersion", true));
      this.textBoxNewVersion.Location = new System.Drawing.Point(128, 6);
      this.textBoxNewVersion.Name = "textBoxNewVersion";
      this.textBoxNewVersion.Size = new System.Drawing.Size(263, 20);
      this.textBoxNewVersion.TabIndex = 1;
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
      // lcOldFiles
      // 
      this.lcOldFiles.AutoSize = true;
      this.lcOldFiles.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
      this.lcOldFiles.Controls.Add(this.treeViewOldFiles);
      this.lcOldFiles.Controls.Add(this.labelOldFiles);
      this.lcOldFiles.Dock = System.Windows.Forms.DockStyle.Fill;
      this.lcOldFiles.Location = new System.Drawing.Point(3, 38);
      this.lcOldFiles.Name = "lcOldFiles";
      this.lcOldFiles.Size = new System.Drawing.Size(394, 252);
      this.lcOldFiles.TabIndex = 3;
      // 
      // treeViewOldFiles
      // 
      this.treeViewOldFiles.Location = new System.Drawing.Point(13, 30);
      this.treeViewOldFiles.Name = "treeViewOldFiles";
      this.treeViewOldFiles.Size = new System.Drawing.Size(378, 219);
      this.treeViewOldFiles.TabIndex = 1;
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
      // folderBrowserDialog
      // 
      this.folderBrowserDialog.Description = "Installation Path";
      // 
      // tableLayoutPanel1
      // 
      this.tableLayoutPanel1.AutoSize = true;
      this.tableLayoutPanel1.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
      this.tableLayoutPanel1.ColumnCount = 2;
      this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
      this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
      this.tableLayoutPanel1.Controls.Add(this.lcOldVersion, 0, 0);
      this.tableLayoutPanel1.Controls.Add(this.lcOldFiles, 0, 1);
      this.tableLayoutPanel1.Controls.Add(this.lcNewVersion, 1, 0);
      this.tableLayoutPanel1.Controls.Add(this.lcNewFiles, 1, 1);
      this.tableLayoutPanel1.Location = new System.Drawing.Point(3, 41);
      this.tableLayoutPanel1.MaximumSize = new System.Drawing.Size(0, 400);
      this.tableLayoutPanel1.Name = "tableLayoutPanel1";
      this.tableLayoutPanel1.RowCount = 2;
      this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 35F));
      this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle());
      this.tableLayoutPanel1.Size = new System.Drawing.Size(800, 293);
      this.tableLayoutPanel1.TabIndex = 1;
      // 
      // panel2
      // 
      this.panel2.Controls.Add(this.buttonOk);
      this.panel2.Controls.Add(this.buttonCancel);
      this.panel2.Location = new System.Drawing.Point(3, 340);
      this.panel2.Name = "panel2";
      this.panel2.Size = new System.Drawing.Size(800, 30);
      this.panel2.TabIndex = 4;
      // 
      // lcNewFiles
      // 
      this.lcNewFiles.Controls.Add(this.treeViewNewFiles);
      this.lcNewFiles.Controls.Add(this.labelNewFiles);
      this.lcNewFiles.Dock = System.Windows.Forms.DockStyle.Fill;
      this.lcNewFiles.Location = new System.Drawing.Point(403, 38);
      this.lcNewFiles.Name = "lcNewFiles";
      this.lcNewFiles.Size = new System.Drawing.Size(394, 252);
      this.lcNewFiles.TabIndex = 4;
      // 
      // labelNewFiles
      // 
      this.labelNewFiles.AutoSize = true;
      this.labelNewFiles.Location = new System.Drawing.Point(9, 13);
      this.labelNewFiles.Name = "labelNewFiles";
      this.labelNewFiles.Size = new System.Drawing.Size(72, 13);
      this.labelNewFiles.TabIndex = 1;
      this.labelNewFiles.Text = "labelNewFiles";
      // 
      // treeViewNewFiles
      // 
      this.treeViewNewFiles.Location = new System.Drawing.Point(12, 29);
      this.treeViewNewFiles.Name = "treeViewNewFiles";
      this.treeViewNewFiles.Size = new System.Drawing.Size(378, 219);
      this.treeViewNewFiles.TabIndex = 2;
      // 
      // buttonCancel
      // 
      this.buttonCancel.Location = new System.Drawing.Point(641, 3);
      this.buttonCancel.Name = "buttonCancel";
      this.buttonCancel.Size = new System.Drawing.Size(75, 23);
      this.buttonCancel.TabIndex = 0;
      this.buttonCancel.Text = "buttonCancel";
      this.buttonCancel.UseVisualStyleBackColor = true;
      // 
      // buttonOk
      // 
      this.buttonOk.Location = new System.Drawing.Point(722, 3);
      this.buttonOk.Name = "buttonOk";
      this.buttonOk.Size = new System.Drawing.Size(75, 23);
      this.buttonOk.TabIndex = 1;
      this.buttonOk.Text = "buttonOk";
      this.buttonOk.UseVisualStyleBackColor = true;
      // 
      // MainForm
      // 
      this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.ClientSize = new System.Drawing.Size(808, 375);
      this.Controls.Add(this.layoutMain);
      this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
      this.MaximizeBox = false;
      this.Name = "MainForm";
      this.SizeGripStyle = System.Windows.Forms.SizeGripStyle.Hide;
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
      this.Text = "MainForm";
      this.Load += new System.EventHandler(this.MainForm_Load);
      this.layoutMain.ResumeLayout(false);
      this.layoutMain.PerformLayout();
      this.lcInstallPath.ResumeLayout(false);
      this.lcInstallPath.PerformLayout();
      ((System.ComponentModel.ISupportInitialize)(this.updaterModelBindingSource)).EndInit();
      this.lcOldVersion.ResumeLayout(false);
      this.lcOldVersion.PerformLayout();
      this.lcNewVersion.ResumeLayout(false);
      this.lcNewVersion.PerformLayout();
      this.lcOldFiles.ResumeLayout(false);
      this.lcOldFiles.PerformLayout();
      this.tableLayoutPanel1.ResumeLayout(false);
      this.tableLayoutPanel1.PerformLayout();
      this.panel2.ResumeLayout(false);
      this.lcNewFiles.ResumeLayout(false);
      this.lcNewFiles.PerformLayout();
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
    private System.Windows.Forms.Panel lcOldFiles;
    private System.Windows.Forms.TreeView treeViewOldFiles;
    private System.Windows.Forms.Label labelOldFiles;
    private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
    private System.Windows.Forms.Panel panel2;
    private System.Windows.Forms.Panel lcNewFiles;
    private System.Windows.Forms.Label labelNewFiles;
    private System.Windows.Forms.TreeView treeViewNewFiles;
    private System.Windows.Forms.Button buttonOk;
    private System.Windows.Forms.Button buttonCancel;
  }
}

