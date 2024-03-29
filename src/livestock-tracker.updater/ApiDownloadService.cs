using LivestockTracker.Updater.Config;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Updater
{
  public class ApiDownloadService : BaseDownloadService, IDownloadService
  {
    private readonly ApiConfig _apiConfig;
    public ApiDownloadService(ILogger<ApiDownloadService> logger, IOptions<ApiConfig> apiConfig) : base(logger)
    {
      _apiConfig = apiConfig.Value;
    }

    public override async Task<DirectoryInfo> DownloadAsync(DownloadableVersionModel version, string savePath, IProgress<int> progress, CancellationToken cancellationToken)
    {
      _logger.LogDebug("{0}: Downloading {1} to {2}", nameof(ApiDownloadService), version.DownloadPath, savePath);

      var bytesRead = 0;
      var buffer = new byte[1024];
      var contentLength = await GetContentLength(version.DownloadPath);

      if (cancellationToken.IsCancellationRequested)
      {
        CleanUpDownload(savePath);
      }

      var progressValue = 0;

      using (var httpClient = new HttpClient())
      {
        httpClient.BaseAddress = new Uri(version.DownloadPath);
        var response = await httpClient.GetAsync(version.DownloadPath);
        if (response.IsSuccessStatusCode)
        {
          var responseStream = await response.Content.ReadAsStreamAsync();
          using (var fs = new FileStream(savePath, FileMode.CreateNew))
          {
            while (!cancellationToken.IsCancellationRequested)
            {
              bytesRead = await responseStream.ReadAsync(buffer, 0, buffer.Length);
              progressValue = (int)(fs.Position / (contentLength * 1m) * 100);
              if (bytesRead == 0)
              {
                progress.Report(100);
                break;
              }

              await fs.WriteAsync(buffer, 0, bytesRead);
              progress.Report(progressValue);
            }
          }
        }
        else
        {
          throw new FileNotFoundException(version.DownloadPath);
        }
      }

      if (cancellationToken.IsCancellationRequested)
      {
        CleanUpDownload(savePath);
      }

      return new DirectoryInfo(savePath);
    }

    public override async Task<IEnumerable<DownloadableVersionModel>> GetAllAvailableVersions()
    {
      _logger.LogDebug("{0}: Getting all available versions at {1}", nameof(ApiDownloadService), Path.Combine(_apiConfig.BaseUrl, _apiConfig.VersionRoute));
      using (var httpClient = GetHttpClient())
      {
        try
        {
          httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
          var actionResult = await httpClient.GetAsync(_apiConfig.VersionRoute);
          var json = await actionResult.Content.ReadAsStringAsync();
          var availableVersions = JsonConvert.DeserializeObject<IEnumerable<ApiVersionModel>>(json);
          return availableVersions.Select(v =>
          {
            try
            {
              return new DownloadableVersionModel(v);
            }
            catch (InvalidCastException ex)
            {
              _logger.LogInformation(ex, "Invalid version published.");
              return new DownloadableVersionModel(new ApiVersionModel
              {
                Version = "0.0.0"
              });
            }
          });
        }
        catch (HttpRequestException ex)
        {
          _logger.LogCritical(ex, "{0}: Failed to fetch available versions", nameof(ApiDownloadService));
          throw new ApplicationException("The system failed to load the required data from the server.");
        }
      }
    }

    public override async Task<long> GetContentLength(string downloadPath)
    {
      _logger.LogDebug("{0}: Getting length of content at ", nameof(ApiDownloadService), downloadPath);

      using (var httpClient = new HttpClient())
      {
        httpClient.BaseAddress = new Uri(downloadPath);
        var response = await httpClient.GetAsync(downloadPath);
        if (response.IsSuccessStatusCode)
        {
          return response.Content.Headers.ContentLength ?? 0;
        }

        throw new InvalidOperationException("Could not retrieve the size of the download file");
      }
    }

    private HttpClient GetHttpClient()
    {

      if (string.IsNullOrWhiteSpace(_apiConfig.BaseUrl))
      {
        throw new ConfigurationException("Conifiguration value not set: api:baseuri");
      }

      var baseUrl = _apiConfig.BaseUrl;
      if (!baseUrl.EndsWith("/"))
      {
        baseUrl += "/";
      }

      var httpClient = new HttpClient
      {
        BaseAddress = new Uri(baseUrl)
      };
      httpClient.DefaultRequestHeaders.Clear();
      return httpClient;
    }
  }
}
