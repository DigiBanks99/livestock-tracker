using System.Collections.Generic;
using System.Threading.Tasks;

namespace LivestockTracker.ProcessManager
{
  public interface IProcessManager
  {
    IEnumerable<RunnableProcess> Processes { get; }

    Task<RunnableProcess> RunProcessAsync(ProcessConfiguration configuration);
    void KillProcess(RunnableProcess process);
    ProcessStatus GetProcessStatus(int processId);
    ProcessStatus GetProcessStatus(string name);
    ProcessStatus GetProcessStatus(RunnableProcess process);
  }
}
