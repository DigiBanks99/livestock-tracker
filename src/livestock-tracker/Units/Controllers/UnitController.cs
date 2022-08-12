using LivestockTracker.Abstractions.Pagination;
using LivestockTracker.Controllers;
using LivestockTracker.Exceptions;
using LivestockTracker.Pagination;
using LivestockTracker.Units.ViewModels;

namespace LivestockTracker.Units;

/// <summary>
///     Provides a collection of endpoints for interacting with unit data.
/// </summary>
public class UnitController : LivestockApiController
{
    private readonly IUnitSearchService _searchService;
    private readonly IUnitManager _unitManager;

    /// <summary>
    ///     The constructor.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="unitManager">Services for managing units.</param>
    /// <param name="searchService">Provides unit searching features.</param>
    public UnitController(ILogger<UnitController> logger, IUnitManager unitManager, IUnitSearchService searchService)
        : base(logger)
    {
        _unitManager = unitManager;
        _searchService = searchService;
    }

    /// <summary>
    ///     Requests a paged collection of units.
    /// </summary>
    /// <param name="query">The search query to match units.</param>
    /// <param name="pageNumber">The number of the page.</param>
    /// <param name="pageSize">The size of each page.</param>
    /// <param name="includeDeleted">Whether to include deleted items.</param>
    /// <returns>A paged collection of units, sorted by description.</returns>
    [HttpGet]
    [ProducesResponseType(typeof(IPagedData<UnitViewModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Get(string? query, int pageNumber = 0, int pageSize = 100,
        bool includeDeleted = false)
    {
        Logger.LogInformation("Requesting {PageSize} units from page {PageNumber}...", pageSize, pageNumber);
        if (includeDeleted)
        {
            Logger.LogDebug("Including deleted units...");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        UnitFilter filter = new(query, includeDeleted);
        PagingOptions pagingOptions = new(pageNumber, pageSize);
        ;

        IPagedData<Unit> result = await _searchService.SearchAsync(filter, pagingOptions, RequestAbortToken)
            .ConfigureAwait(false);
        PagedData<UnitViewModel> response =
            new(result.Data.Select(unit => unit.ToViewModel()), result.PageSize, result.CurrentPage,
                result.TotalRecordCount);

        return Ok(response);
    }

    /// <summary>
    ///     Requests the detail for a single unit with an ID that matches the value provided.
    /// </summary>
    /// <param name="id">The unique identifier of the unit.</param>
    /// <returns>The unit detail if it was found.</returns>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(UnitViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(int id)
    {
        Logger.LogInformation("Requesting the detail of the unit with ID {UnitId}...", id);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Unit? unit = await _searchService.GetOneAsync(id, RequestAbortToken)
                .ConfigureAwait(false);

            return unit == null
                ? NotFound()
                : Ok(unit.ToViewModel());
        }
        catch (EntityNotFoundException<Unit> ex)
        {
            return NotFound(ex.Message);
        }
    }

    /// <summary>
    ///     Requests the creation of a new unit with the provided detail.
    /// </summary>
    /// <param name="unit">The detail of the unit that should be added.</param>
    /// <returns>The added unit if successful.</returns>
    [HttpPost]
    [ProducesResponseType(typeof(UnitViewModel), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Add([FromBody] CreateUnitViewModel unit)
    {
        Logger.LogInformation("Requesting the creation of a unit with detail {@Unit}...", unit);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Unit addedUnit = await _unitManager.AddUnitAsync(unit.ToUnit(), RequestAbortToken)
                .ConfigureAwait(false);

            return CreatedAtAction(nameof(Get), new { id = addedUnit.Id }, addedUnit.ToViewModel());
        }
        catch (ItemAlreadyExistsException<int> ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    ///     Requests the updating of an existing unit with the provided detail.
    /// </summary>
    /// <param name="id">The unique identifier of the unit.</param>
    /// <param name="request">The values with which the unit should be updated.</param>
    /// <returns>The updated unit if successful.</returns>
    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(UnitViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateUnitViewModel request)
    {
        Logger.LogInformation("Requests the updating of a unit with {UnitId} with values {@Unit}...", id, request);

        if (id != request.Id)
        {
            ModelState.AddModelError(nameof(request.Id), "The id in the body and the URL don't match.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Unit updatedUnit = await _unitManager.UpdateAsync(id, request.ToUnit(), RequestAbortToken)
                .ConfigureAwait(false);
            return Ok(updatedUnit.ToViewModel());
        }
        catch (EntityNotFoundException<Unit> ex)
        {
            return NotFound(ex.Message);
        }
    }

    /// <summary>
    ///     Requests the deletion of an existing unit.
    /// </summary>
    /// <param name="id">The unique identifier of the unit.</param>
    /// <returns>The id of the removed unit.</returns>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        Logger.LogInformation("Requesting the removal of unit with ID {UnitId}...", id);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            int removedId = await _unitManager.RemoveAsync(id, RequestAbortToken).ConfigureAwait(false);

            return Ok(removedId);
        }
        catch (EntityNotFoundException<Unit> ex)
        {
            return NotFound(ex.Message);
        }
    }
}
