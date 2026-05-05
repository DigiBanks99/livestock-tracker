using LivestockTracker.Animals.ViewModels;

namespace LivestockTracker.Animals;

internal static class AnimalEndpoints
{
    internal static IEndpointRouteBuilder MapAnimalEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/animal/stats", async (KraalReportHandler handler, CancellationToken cancellationToken) =>
        {
            KraalStats stats = await handler.HandleAsync(cancellationToken).ConfigureAwait(false);

            return Results.Ok(KraalStatsViewModel.Create(stats));
        });

        return endpoints;
    }
}
