using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Updater
{
  public class ApiDonwloadService : BaseDonwloadService, IDownloadService
  {
    public ApiDonwloadService(ILogger logger) : base(logger)
    {

    }

    public override Task<DirectoryInfo> DownloadAsync(string fileName, string savePath, IProgress<int> progress, CancellationToken cancellationToken)
    {
      throw new NotImplementedException();
    }

    public override IEnumerable<string> GetAllAvailableVersions()
    {
      throw new NotImplementedException();
    }

    public override long GetContentLength(string downloadPath)
    {
      throw new NotImplementedException();
    }
  }
}
