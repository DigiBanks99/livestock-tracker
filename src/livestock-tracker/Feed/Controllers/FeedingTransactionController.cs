using LivestockTracker.Abstractions.Models;
using LivestockTracker.Controllers;
using LivestockTracker.Feed.ViewModels;

namespace LivestockTracker.Feed;

/// <summary>
///     Provides endpoints for interacting with feeding transactions.
/// </summary>
public class FeedingTransactionController : LivestockApiController
{
    private readonly IFeedingTransactionManager _feedingTransactionManager;
    private readonly IFeedingTransactionSearchService _searchService;

    /// <summary>
    ///     Constructor.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="feedingTransactionManager">Manages the storing, updating and removal of feeding transactions.</param>
    /// <param name="searchService">Provides services for retrieving feeding transaction data.</param>
    public FeedingTransactionController(ILogger<FeedingTransactionController> logger,
        IFeedingTransactionManager feedingTransactionManager,
        IFeedingTransactionSearchService searchService)
        : base(logger)
    {
        _feedingTransactionManager = feedingTransactionManager;
        _searchService = searchService;
    }

    /// <summary>
    ///     Requests a paged list of feeding transactions that belong to an animal.
    /// </summary>
    /// <param name="animalIds">The animals that either need to be included or excluded.</param>
    /// <param name="exclude">Whether the criteria should be used to include or exclude.</param>
    /// <param name="feedTypeIds">The type of medicine to be included or excluded.</param>
    /// <param name="pageNumber">The number of the page.</param>
    /// <param name="pageSize">The size of each page.</param>
    /// <returns>A paged list of feeding transaction for the animal.</returns>
    [HttpGet]
    [ProducesResponseType(typeof(PagedData<FeedingTransactionViewModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public IActionResult GetAll(
        [FromQuery] long[]? animalIds = null,
        [FromQuery] bool? exclude = null,
        [FromQuery] int[]? feedTypeIds = null,
        [FromQuery] int pageNumber = 0,
        [FromQuery] int pageSize = 10)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        FeedingTransactionFilter filter = new(
            animalIds ?? Array.Empty<long>(),
            feedTypeIds ?? Array.Empty<int>(),
            exclude ?? false);
        PagingOptions pagingOptions = new(pageNumber, pageSize);
        Logger.LogInformation(
            "Requesting {PageSize} feeding transactions from page {PageNumber} with filter: {@Filter}...",
            pageSize,
            pageNumber,
            filter);

        IPagedData<FeedingTransaction> result = _searchService.Search(filter, pagingOptions);
        PagedData<FeedingTransactionViewModel> response = new(
            result.Data.Select(transaction => transaction.ToViewModel()),
            result.PageSize, result.CurrentPage, result.TotalRecordCount);
        return Ok(response);
    }

    /// <summary>
    ///     Find the detail of a feeding transaction with a given ID ensuring it belongs to the correct animal.
    /// </summary>
    /// <param name="animalId">The unique identifier of the animal.</param>
    /// <param name="id">The unique identifier of the feeding transaction.</param>
    /// <returns>The detail of the feeding transaction.</returns>
    [HttpGet("{animalId:long}/{id:long}")]
    [ProducesResponseType(typeof(FeedingTransactionViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    public IActionResult GetTransaction(long animalId, long id)
    {
        Logger.LogInformation(
            "Requesting the detail for feeding transaction with ID {Id} for the animal with ID {AnimalId}...",
            animalId,
            id);
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        FeedingTransaction? transaction = _searchService.GetOne(id);
        return transaction == null
            ? NotFound()
            : transaction.AnimalId != animalId
                ? StatusCode(StatusCodes.Status500InternalServerError,
                    "The data retrieval service did not respond as expected.")
                : Ok(transaction.ToViewModel());
    }

    /// <summary>
    ///     Requests the creation of a feeding transaction with the given details.
    /// </summary>
    /// <param name="request">The details of the feeding transaction to be created.</param>
    /// <returns>The created feeding transaction.</returns>
    [HttpPost]
    [ProducesResponseType(typeof(FeedingTransactionViewModel), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddAsync(CreateFeedingTransactionViewModel request)
    {
        Logger.LogInformation("Requesting the creation of feeding transaction {@Request}", request);
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            FeedingTransaction addedTransaction = await _feedingTransactionManager
                .AddAsync(request.ToFeedingTransaction(), RequestAbortToken)
                .ConfigureAwait(false);

            return CreatedAtAction(nameof(GetTransaction),
                new
                {
                    id = addedTransaction.Id,
                    animalId = addedTransaction.AnimalId
                },
                addedTransaction.ToViewModel());
        }
        catch (ItemAlreadyExistsException<long> ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    ///     Requests the updating of an existing feeding transaction with the given detail.
    /// </summary>
    /// <param name="id">The unique identifier of the feeding transaction.</param>
    /// <param name="request">The detail with which the feeding transaction must be updated.</param>
    /// <returns>The updated feeding transaction.</returns>
    [HttpPut("{id:long}")]
    [ProducesResponseType(typeof(FeedingTransactionViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateAsync(long id, [Required] UpdateFeedingTransactionViewModel request)
    {
        Logger.LogInformation(
            "Requesting the updating of feeding transaction with ID {FeedingTransactionId} with values {@DesiredValues}...",
            id, request);

        if (id != request.Id)
        {
            ModelState.AddModelError(nameof(request.Id),
                "The id in the transaction body does match the id in the route.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            FeedingTransaction updatedTransaction = await _feedingTransactionManager
                .UpdateAsync(id, request.ToFeedingTransaction(), RequestAbortToken)
                .ConfigureAwait(false);
            return Ok(updatedTransaction.ToViewModel());
        }
        catch (ArgumentException ex)
        {
            ModelState.AddModelError(nameof(request.AnimalId), ex.Message);
            return BadRequest(ModelState);
        }
        catch (EntityNotFoundException<FeedingTransaction> ex)
        {
            return NotFound(ex.Message);
        }
    }

    /// <summary>
    ///     Request the deletion of a feeding transaction with the given ID.
    /// </summary>
    /// <param name="id">The unique identifier of the feeding transaction.</param>
    /// <returns>The ID of the removed feeding transaction.</returns>
    [HttpDelete("{id:long}")]
    [ProducesResponseType(typeof(long), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteAsync(long id)
    {
        Logger.LogInformation("Requesting the deletion of feeding transaction with ID {Id}...", id);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            long removedId = await _feedingTransactionManager.RemoveAsync(id, RequestAbortToken)
                .ConfigureAwait(false);
            return Ok(removedId);
        }
        catch (EntityNotFoundException<FeedingTransaction> ex)
        {
            return NotFound(ex.Message);
        }
    }
}
