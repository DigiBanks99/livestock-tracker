using System.Collections.Generic;

namespace LivestockTracker.ProcessManager
{
  public class ProcessConfiguration
  {
    public string Name { get; set; }
    public string Executeable { get; set; }
    public string ExecutableDirectory { get; set; }
    public string WorkingDirectory { get; set; }
    public IEnumerable<string> Arguments { get; set; }
    public bool LiveFeedback { get; set; }
    public bool NewWindow { get; set; }
    public bool IgnoreFailure { get; set; }
  }
}
