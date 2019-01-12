using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace LivestockTracker.ProcessManager
{

  public class RunnableProcess
  {
    private readonly object _lockObj;
    private readonly ProcessConfiguration _configuration;
    private Process _process;
    private ProcessStartInfo _startInfo;

    internal RunnableProcess(ProcessConfiguration configuration)
    {
      _lockObj = new object();
      _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
      CreateProcess();
    }

    public string Name { get { return _process.ProcessName; }  }
    public string Executable { get { return _startInfo.FileName; } }
    public string WorkingDirectory { get { return _startInfo.WorkingDirectory; } }
    public IEnumerable<string> Arguments { get; } = new List<string>();

    public Process Process
    {
      get
      {
        if (_process == null)
          CreateProcess();

        return _process;
      }
    }

    public ProcessStatus Status {
      get
      {
        if (_process == null)
          return ProcessStatus.NotRun;

        if (_process.HasExited)
        {
          if (_process.ExitCode == 0)
          {
            return ProcessStatus.Stopped;
          }
          else
          {
            if (_configuration.IgnoreFailure)
              return ProcessStatus.Stopped;
            return ProcessStatus.Error;
          }
        }
        else
        {
          try
          {
            var time = _process.StartTime.ToString(); // access start time for try-catch
            if (!string.IsNullOrEmpty(time))
              return ProcessStatus.Starting;
          }
          catch (InvalidOperationException ex)
          {
            if (!string.IsNullOrEmpty(ex.Message))
            {
              if (ex.Message.Contains("start"))
                return ProcessStatus.Starting;
              else
                return ProcessStatus.Stopped;
            }

            return ProcessStatus.NotRun;
          }

          if (_process.Responding)
            return ProcessStatus.Running;
          else
            return ProcessStatus.Stopping;
        }
      }
    }

    public int ProcessId { get { return _process.Id; } }

    public string Output { get { return _process.StandardOutput.ReadToEnd(); } }

    public string ErrorOutput { get { return _process.StandardError.ReadToEnd(); } }

    public void CreateProcess()
    {
      _process = new Process
      {
        StartInfo = GetProcessStartInfo()
      };
    }

    public ProcessStartInfo GetProcessStartInfo()
    {
      if (_startInfo != null)
        return _startInfo;

      lock (_lockObj)
      {
        if (_startInfo != null)
          return _startInfo;

        _startInfo = BuildProcessStartInfo();
      }

      return _startInfo;
    }

    private ProcessStartInfo BuildProcessStartInfo()
    {
      return new ProcessStartInfo
      {
        Arguments = string.Join(',', _configuration.Arguments),
        FileName = string.IsNullOrEmpty(_configuration.ExecutableDirectory) ? _configuration.Executeable : System.IO.Path.Combine(_configuration.ExecutableDirectory, _configuration.Executeable),
        CreateNoWindow = !_configuration.NewWindow,
        UseShellExecute = true,
        WorkingDirectory = _configuration.WorkingDirectory
      };
    }
  }
}
