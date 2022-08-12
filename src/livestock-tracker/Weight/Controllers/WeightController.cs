using System.ComponentModel;
using LivestockTracker.Abstractions.Pagination;
using LivestockTracker.Controllers;
using LivestockTracker.Exceptions;
using LivestockTracker.Pagination;
using LivestockTracker.Weight.ViewModels;

namespace LivestockTracker.Weight;

/// <summary>
///     Provides a set of endpoints for interacting with weight transactions.
/// </summary>
public sealed class WeightController : LivestockApiController
{
    private readonly IWeightTransactionSearchService _searchService;
    private readonly IWeightTransactionManager _weightTransactionManager;

    /// <summary>
    ///     The constructor.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="weightTransactionManager">
    ///     A service for performing CRUD operations on weight transactions.
    /// </param>
    /// <param name="searchService"></param>
    public WeightController(ILogger<WeightController> logger,
        IWeightTransactionManager weightTransactionManager,
        IWeightTransactionSearchService searchService)
        : base(logger)
    {
        _weightTransactionManager = weightTransactionManager;
        _searchService = searchService;
    }

    /// <summary>
    ///     Requests the retrieval of a paged set of weight transactions according
    ///     to some filter.
    /// </summary>
    /// <param name="pageNumber">The number of the pagination page.</param>
    /// <param name="pageSize">The size of the the pagination page.</param>
    /// <param name="animalIds">The ids for the animals to be filtered.</param>
    /// <param name="weightUpper">The upper limit of the weight.</param>
    /// <param name="weightLower">The lower limit of the weight.</param>
    /// <param name="exclude">Whether to exclude the filter values.</param>
    /// <returns>
    ///     A paged set of <see cref="WeightTransaction" /> items, filtered as requested.
    /// </returns>
    [HttpGet]
    [ProducesResponseType(typeof(IPagedData<WeightTransaction>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetAllAsync(int pageNumber,
        int pageSize,
        [FromQuery] long[]? animalIds,
        decimal? weightUpper,
        decimal? weightLower,
        bool? exclude = false)
    {
        Logger.LogInformation("Requesting {PageSize} weight transactions for {@AnimalIds} from page {PageNumber}...",
            pageSize,
            animalIds ?? Enumerable.Empty<long>(),
            pageNumber);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        PagingOptions pagingOptions = new(pageNumber, pageSize == 0 ? 10 : pageSize);
        WeightTransactionFilter filter = new();
        if (animalIds != null)
        {
            filter.AddAnimalIds(animalIds);
        }

        filter.SetWeightBounds(weightLower, weightUpper);
        if (exclude.HasValue && exclude.Value)
        {
            filter.SetIncludeState(false);
        }

        IPagedData<WeightTransaction> transactions = await _searchService.FetchPagedAsync(filter,
                pagingOptions,
                ListSortDirection.Descending,
                RequestAbortToken)
            .ConfigureAwait(false);

        return Ok(transactions);
    }

    /// <summary>
    ///     Requests the retrieval of a weight transaction with the given identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the transaction.</param>
    /// <returns>
    ///     <list type="bullet">
    ///         <item>The weight transaction if found.</item>
    ///         <item>404 if not found.</item>
    ///     </list>
    /// </returns>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(WeightTransaction), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetSingleAsync(long id)
    {
        Logger.LogInformation("Requesting the weight transaction with {WeightTransactionId}...", id);

        WeightTransaction? transaction =
            await _searchService.GetSingleAsync(id, RequestAbortToken).ConfigureAwait(false);
        if (transaction == null)
        {
            return NotFound();
        }

        return Ok(transaction);
    }

    /// <summary>
    ///     Requests the creation of a weight transaction for a specific animal.
    /// </summary>
    /// <param name="model">The details of the weight transaction.</param>
    /// <returns>The weight transaction that was added.</returns>
    [HttpPost]
    [ProducesResponseType(typeof(WeightTransaction), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateAsync(CreateWeightTransactionViewModel model)
    {
        Logger.LogInformation("Requesting the creation of weight transaction: {@Transaction} for animal {@AnimalId}...",
            model, model.AnimalId);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        WeightTransaction transaction = new(model.AnimalId, model.Weight, model.TransactionDate);

        transaction = await _weightTransactionManager.AddAsync(transaction, RequestAbortToken)
            .ConfigureAwait(false);

        return Ok(transaction);
    }

    /// <summary>
    ///     Requests the update of an existing weight transaction with the given
    ///     values.
    /// </summary>
    /// <param name="id">The identifier for the weight transaction.</param>
    /// <param name="model">The details of the weight transaction.</param>
    /// <returns>The weight transaction that was updated.</returns>
    [HttpPut("{id:long}")]
    [ProducesResponseType(typeof(WeightTransaction), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateAsync(long id, UpdateWeightTransactionViewModel model)
    {
        Logger.LogInformation("Requesting the update of weight transaction: {@Transaction} for animal {@AnimalId}...",
            model, model.AnimalId);

        if (id != model.Id)
        {
            ModelState.AddModelError(nameof(model.Id), "The id in the body does match the id in the route.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        WeightTransaction transaction = new(model.AnimalId, model.Weight, model.TransactionDate);

        transaction = await _weightTransactionManager.UpdateAsync(id, transaction, RequestAbortToken)
            .ConfigureAwait(false);

        return Ok(transaction);
    }

    /// <summary>
    ///     Requests the deletion of a weight transaction.
    /// </summary>
    /// <param name="id">The identifier of the transaction.</param>
    /// <returns>
    ///     <list type="bullet">
    ///         <item>The identifier of the deleted weight transaction if found.</item>
    ///         <item>404 if not found.</item>
    ///     </list>
    /// </returns>
    [HttpDelete("{id:long}")]
    [ProducesResponseType(typeof(long), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteAsync(long id)
    {
        Logger.LogInformation("Requesting the deletion of weight transaction with {@Id}...", id);

        try
        {
            long removedId = await _weightTransactionManager.RemoveAsync(id, RequestAbortToken)
                .ConfigureAwait(false);
            return Ok(removedId);
        }
        catch (EntityNotFoundException<WeightTransaction> ex)
        {
            return NotFound(ex.Message);
        }
    }
}
