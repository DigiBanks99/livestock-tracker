using LivestockTracker.Exceptions;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace LivestockTracker.Feed;

/// <summary>
///     Manages the state of <see cref="FeedType" /> items.
/// </summary>
public sealed class FeedTypeManager : IFeedTypeManager
{
    private readonly LivestockContext _dbContext;
    private readonly ILogger<FeedTypeManager> _logger;

    /// <summary>
    ///     Creates a new instance of <see cref="FeedTypeManager" /> with it's core dependencies.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="dbContext">The database context.</param>
    public FeedTypeManager(ILogger<FeedTypeManager> logger, LivestockContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    /// <inheritdoc />
    /// <exception cref="ItemAlreadyExistsException{TKeyType}">If a feed type with the same ID already exists.</exception>
    public async Task<FeedType> AddAsync(FeedType requestedFeedType, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Adding a feed type...");

        FeedType entity = new(requestedFeedType.Description);

        if (_dbContext.FeedTypes.Any(feedType => feedType.Id == requestedFeedType.Id))
        {
            throw new ItemAlreadyExistsException<int>(requestedFeedType.Id, "A Feed Type");
        }

        EntityEntry<FeedType> changes =
            await _dbContext.FeedTypes.AddAsync(entity, cancellationToken).ConfigureAwait(false);
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        _logger.LogDebug("Feed type '{Description}' added with detail", changes.Entity.Description);
        return changes.Entity;
    }

    /// <inheritdoc />
    /// <exception cref="EntityNotFoundException{T}">When no feed type with the given ID can be found.</exception>
    public async Task<FeedType> UpdateAsync(int id, FeedType requestedValues, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Updating the feed type with ID {Id}...", id);

        FeedType? entity = _dbContext.FeedTypes
            .FirstOrDefault(feedType => feedType.Id == id);
        if (entity == null)
        {
            _logger.LogWarning("An attempt was made to update a non-existing feed type {@Request}", requestedValues);
            throw new EntityNotFoundException<FeedType>(id);
        }

        entity.Update(requestedValues);
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return entity;
    }

    /// <inheritdoc />
    /// <exception cref="EntityNotFoundException{T}">When no feed type with the given ID can be found.</exception>
    public async Task<int> RemoveAsync(int id, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Marking the feed type with ID {Id} as deleted...", id);

        FeedType entity = _dbContext.FeedTypes.FirstOrDefault(feedType => feedType.Id == id)
                          ?? throw new EntityNotFoundException<FeedType>(id);

        entity.Delete();
        await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        _logger.LogDebug("Feed type with ID {Id} marked as deleted...", id);
        return id;
    }
}
