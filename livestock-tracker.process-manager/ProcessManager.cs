using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LivestockTracker.ProcessManager
{
  public class ProcessManager : IProcessManager
  {
    public IEnumerable<RunnableProcess> Processes { get; } = new List<RunnableProcess>();

    public ProcessStatus GetProcessStatus(int processId)
    {
      var process = Processes.FirstOrDefault(p => p.ProcessId == processId);
      return GetProcessStatus(process);
    }

    public ProcessStatus GetProcessStatus(string name)
    {
      var process = Processes.FirstOrDefault(p => p.Name == name);
      return GetProcessStatus(process);
    }

    public ProcessStatus GetProcessStatus(RunnableProcess process)
    {
      if (process == null) throw new ArgumentNullException(nameof(process));
      return process.Status;
    }

    public Task<RunnableProcess> RunProcessAsync(ProcessConfiguration configuration)
    {
      throw new NotImplementedException();
    }
  }
}
