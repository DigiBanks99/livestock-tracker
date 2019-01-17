namespace LivestockTracker.Updater
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
      this.panel1 = new System.Windows.Forms.Panel();
      this.buttonInstallPath = new System.Windows.Forms.Button();
      this.labelInstallPath = new System.Windows.Forms.Label();
      this.textBoxInstallPath = new System.Windows.Forms.TextBox();
      this.updaterModelBindingSource = new System.Windows.Forms.BindingSource(this.components);
      this.folderBrowserDialog = new System.Windows.Forms.FolderBrowserDialog();
      this.layoutMain.SuspendLayout();
      this.panel1.SuspendLayout();
      ((System.ComponentModel.ISupportInitialize)(this.updaterModelBindingSource)).BeginInit();
      this.SuspendLayout();
      // 
      // layoutMain
      // 
      this.layoutMain.Controls.Add(this.panel1);
      this.layoutMain.Dock = System.Windows.Forms.DockStyle.Fill;
      this.layoutMain.FlowDirection = System.Windows.Forms.FlowDirection.TopDown;
      this.layoutMain.Location = new System.Drawing.Point(0, 0);
      this.layoutMain.Name = "layoutMain";
      this.layoutMain.Size = new System.Drawing.Size(800, 450);
      this.layoutMain.TabIndex = 0;
      // 
      // panel1
      // 
      this.panel1.Controls.Add(this.buttonInstallPath);
      this.panel1.Controls.Add(this.labelInstallPath);
      this.panel1.Controls.Add(this.textBoxInstallPath);
      this.panel1.Location = new System.Drawing.Point(3, 3);
      this.panel1.Name = "panel1";
      this.panel1.Size = new System.Drawing.Size(797, 36);
      this.panel1.TabIndex = 0;
      // 
      // buttonInstallPath
      // 
      this.buttonInstallPath.Location = new System.Drawing.Point(710, 6);
      this.buttonInstallPath.Name = "buttonInstallPath";
      this.buttonInstallPath.Size = new System.Drawing.Size(75, 23);
      this.buttonInstallPath.TabIndex = 2;
      this.buttonInstallPath.Text = "button1";
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
      // MainForm
      // 
      this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.ClientSize = new System.Drawing.Size(800, 450);
      this.Controls.Add(this.layoutMain);
      this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
      this.MaximizeBox = false;
      this.Name = "MainForm";
      this.SizeGripStyle = System.Windows.Forms.SizeGripStyle.Hide;
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
      this.Text = "MainForm";
      this.Load += new System.EventHandler(this.MainForm_Load);
      this.layoutMain.ResumeLayout(false);
      this.panel1.ResumeLayout(false);
      this.panel1.PerformLayout();
      ((System.ComponentModel.ISupportInitialize)(this.updaterModelBindingSource)).EndInit();
      this.ResumeLayout(false);

    }

    #endregion

    private System.Windows.Forms.FlowLayoutPanel layoutMain;
    private System.Windows.Forms.Panel panel1;
    private System.Windows.Forms.Button buttonInstallPath;
    private System.Windows.Forms.Label labelInstallPath;
    private System.Windows.Forms.TextBox textBoxInstallPath;
    private System.Windows.Forms.BindingSource updaterModelBindingSource;
    private System.Windows.Forms.FolderBrowserDialog folderBrowserDialog;
  }
}

