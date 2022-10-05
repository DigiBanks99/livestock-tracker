namespace LivestockTracker.Animals;

/// <summary>
/// </summary>
public sealed class KraalReportHandler
{
    private readonly LivestockContext _livestockContext;
    private readonly ILogger<KraalReportHandler> _logger;

    /// <summary>
    /// </summary>
    /// <param name="logger"></param>
    /// <param name="livestockContext"></param>
    public KraalReportHandler(ILogger<KraalReportHandler> logger, LivestockContext livestockContext)
    {
        _livestockContext = livestockContext;
        _logger = logger;
    }

    /// <summary>
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async ValueTask<KraalStats> HandleAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Fetching kraal  stats...");

        return await _livestockContext.KraalStats.FirstAsync(cancellationToken).ConfigureAwait(false);
    }
}
