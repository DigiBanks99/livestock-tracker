using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Controllers;
using LivestockTracker.Feed.ViewModels;
using LivestockTracker.Logic.Paging;
using LivestockTracker.Models.Paging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LivestockTracker.Feed;

/// <summary>
///     Provides a set of endpoints for interacting with feed types.
/// </summary>
public class FeedTypeController : LivestockApiController
{
    private readonly IFeedTypeManager _feedTypeManager;
    private readonly IFeedTypeSearchService _feedTypeSearchService;

    /// <summary>
    ///     Constructor.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="feedTypeManager">A service for performing CRUD operations on feed types.</param>
    /// <param name="feedTypeSearchService">A service for performing search operations on feed types.</param>
    public FeedTypeController(ILogger<FeedTypeController> logger,
        IFeedTypeManager feedTypeManager,
        IFeedTypeSearchService feedTypeSearchService)
        : base(logger)
    {
        _feedTypeManager = feedTypeManager;
        _feedTypeSearchService = feedTypeSearchService;
    }

    /// <summary>
    ///     Requests a paged list of feed types that are viewable, sorted by description.
    /// </summary>
    /// <param name="query">The search query to match feed types.</param>
    /// <param name="pageNumber">The number of the page.</param>
    /// <param name="pageSize">The size of each page.</param>
    /// <param name="includeDeleted">Whether to include deleted items.</param>
    /// <returns>A sorted and paged list of feed types.</returns>
    [HttpGet]
    [ProducesResponseType(typeof(IPagedData<FeedTypeViewModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public IActionResult GetAll(string? query, int pageNumber = 0, int pageSize = 100, bool includeDeleted = false)
    {
        Logger.LogInformation("Requesting {PageSize} feed types from page {PageNumber}...", pageSize, pageNumber);
        if (includeDeleted)
        {
            Logger.LogDebug("Including deleted medicine types...");
        }

        FeedTypeFilter filter = new(query, includeDeleted);
        PagingOptions pagingOptions = new(pageNumber, pageSize);

        IPagedData<FeedType> result = _feedTypeSearchService.Search(filter, pagingOptions);
        PagedData<FeedTypeViewModel> response = new(result.Data.Select(feedType => feedType.ToFeedTypeViewModel()),
            result.PageSize, result.CurrentPage, result.TotalRecordCount);

        return Ok(response);
    }

    /// <summary>
    ///     Request the detail of a specific feed type.
    /// </summary>
    /// <param name="id">The unique identifier for the feed type.</param>
    /// <returns>The feed type if found.</returns>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(FeedTypeViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public IActionResult Get(int id)
    {
        Logger.LogInformation("Requesting the detail of the feed type with ID {FeedTypeId}...", id);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var item = _feedTypeSearchService.GetOne(id)?.ToFeedTypeViewModel();
        return item == null
            ? NotFound()
            : Ok(item);
    }

    /// <summary>
    ///     Requests the creation of a new feed type with the supplied details.
    /// </summary>
    /// <param name="request">The details of the feed type to be created.</param>
    /// <returns>The created feed type with it's unique identifier.</returns>
    [HttpPost]
    [ProducesResponseType(typeof(FeedTypeViewModel), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Add([FromBody] CreateFeedTypeViewModel request)
    {
        Logger.LogInformation("Requesting the creation of a new feed type with details {@FeedType}...", request);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            FeedType addedItem = await _feedTypeManager.AddAsync(request.ToFeedType(), RequestAbortToken)
                .ConfigureAwait(false);

            return CreatedAtAction(nameof(Get), new { id = addedItem.Id }, addedItem.ToFeedTypeViewModel());
        }
        catch (ItemAlreadyExistsException<int> ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    ///     Request updates to a feed type that already exists.
    /// </summary>
    /// <param name="id">The id of the feed type that should be updated.</param>
    /// <param name="feedType">The updates for the feed type.</param>
    /// <returns>The updated feed type.</returns>
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(FeedType), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Update(int id, [Required] [FromBody] FeedType feedType)
    {
        Logger.LogInformation("Requesting updates to the feed type with ID {FeedTypeId}...", id);

        if (id != feedType.Id)
        {
            ModelState.AddModelError(nameof(feedType.Id), "The id in the body and in the URL do not match.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            FeedType updatedFeedType = await _feedTypeManager.UpdateAsync(feedType, RequestAbortToken)
                .ConfigureAwait(false);

            return Ok(updatedFeedType);
        }
        catch (EntityNotFoundException<FeedType> ex)
        {
            return NotFound(ex.Message);
        }
    }

    /// <summary>
    ///     Request the deletion of feed type with the provided id.
    /// </summary>
    /// <param name="id">The id of the feed type that should be deleted.</param>
    /// <returns>The id of the feed type that was deleted.</returns>
    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async ValueTask<IActionResult> Delete([Required] int id)
    {
        Logger.LogInformation("Requesting the deletion a feed type with ID {FeedTpeId}...", id);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            int removedId = await _feedTypeManager.RemoveAsync(id, RequestAbortToken)
                .ConfigureAwait(false);

            return Ok(removedId);
        }
        catch (EntityNotFoundException<FeedType> ex)
        {
            return NotFound(ex.Message);
        }
    }
}
