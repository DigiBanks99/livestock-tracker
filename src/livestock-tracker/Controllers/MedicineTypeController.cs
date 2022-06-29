using LivestockTracker.Abstractions.Models;
using LivestockTracker.Medicine;
using LivestockTracker.Models.Paging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace LivestockTracker.Controllers;

/// <summary>
/// Provides a set of endpoints for interacting with medicine types.
/// </summary>
public class MedicineTypeController : LivestockApiController
{
    private readonly IMedicineTypeCrudService _medicineTypeCrudService;
    private readonly IMedicineTypeSearchService _medicineTypeSearchService;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="medicineTypeCrudService">A service for medicine type CRUD operations.</param>
    /// <param name="medicineTypeSearchService">A service for performing search operations on medicine types.</param>
    public MedicineTypeController(ILogger<MedicineTypeController> logger,
                                  IMedicineTypeCrudService medicineTypeCrudService,
                                  IMedicineTypeSearchService medicineTypeSearchService)
        : base(logger)
    {
        _medicineTypeCrudService = medicineTypeCrudService;
        _medicineTypeSearchService = medicineTypeSearchService;
    }

    /// <summary>
    /// Requests a paged list of medicine types that are viewable, sorted by description.
    /// </summary>
    /// <param name="query">The search query to match medicine types.</param>
    /// <param name="pageNumber">The number of the page.</param>
    /// <param name="pageSize">The size of each page.</param>
    /// <param name="includeDeleted">Whether to include deleted items.</param>
    /// <returns>A sorted and paged list of medicine types.</returns>
    [HttpGet]
    [ProducesResponseType(typeof(IPagedData<MedicineType>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public IActionResult GetAll(string? query, int pageNumber = 0, int pageSize = 100, bool includeDeleted = false)
    {
        Logger.LogInformation("Requesting {PageSize} medicine types from page {PageNumber}...", pageSize, pageNumber);
        if (includeDeleted)
        {
            Logger.LogDebug("Including deleted medicine types...");
        }

        MedicineTypeFilter filter = new(query, includeDeleted);
        PagingOptions pagingOptions = new(pageNumber, pageSize);

        return Ok(_medicineTypeSearchService.Search(filter, pagingOptions));
    }

    /// <summary>
    /// Request the detail of a specific medicine type.
    /// </summary>
    /// <param name="id">The unique identifier for the medicine type.</param>
    /// <returns>The medicine type if found.</returns>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(MedicineType), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public IActionResult GetMedicineType(int id)
    {
        Logger.LogInformation("Requesting medicine {Id}...", id);
        MedicineType? medicineType = _medicineTypeSearchService.GetOne(id);

        return medicineType == null
            ? NotFound()
            : Ok(medicineType);
    }

    /// <summary>
    /// Requests the creation of a new medicine type with the supplied details.
    /// </summary>
    /// <param name="medicineType">The details of the medicine type to be created.</param>
    /// <returns>The created medicine type with it's unique identifier.</returns>
    [HttpPost]
    [ProducesResponseType(typeof(MedicineType), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Add([Required][FromBody] MedicineType medicineType)
    {
        Logger.LogInformation("Requesting the creation of a new medicine type with details {@MedicineType}...", medicineType);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            MedicineType addedItem = await _medicineTypeCrudService.AddAsync(medicineType, RequestAbortToken).ConfigureAwait(false);

            return CreatedAtAction(nameof(GetMedicineType), new { id = addedItem.Id }, addedItem);
        }
        catch (ItemAlreadyExistsException<int> ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Request updates to a medicine type that already exists.
    /// </summary>
    /// <param name="id">The id of the medicine type that should be updated.</param>
    /// <param name="medicineType">The updates for the medicine type.</param>
    /// <returns>The updated medicine type.</returns>
    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(MedicineType), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Update([FromRoute] int id, [Required] MedicineType medicineType)
    {
        Logger.LogInformation("Requesting updates to the medicine type with ID {Id}...", id);

        if (id != medicineType.Id)
        {
            ModelState.AddModelError(nameof(medicineType.Id), "The id in the body and in the URL do not match.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            MedicineType updated = await _medicineTypeCrudService.UpdateAsync(medicineType, RequestAbortToken).ConfigureAwait(false);

            return Ok(updated);
        }
        catch (EntityNotFoundException<MedicineType> ex)
        {
            return NotFound(ex.Message);
        }
    }


    /// <summary>
    /// Request the deletion of medicine type with the provided id.
    /// </summary>
    /// <param name="id">The id of the medicine type that should be deleted.</param>
    /// <returns>The id of the medicine type that was deleted.</returns>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Delete(int id)
    {
        Logger.LogInformation("Requesting the deletion a medicine type with ID {Id}...", id);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            int removedMedicineTypeId = await _medicineTypeCrudService.RemoveAsync(id, RequestAbortToken).ConfigureAwait(false);

            return Ok(removedMedicineTypeId);
        }
        catch (EntityNotFoundException<MedicineType> ex)
        {
            return NotFound(ex.Message);
        }
    }
}
