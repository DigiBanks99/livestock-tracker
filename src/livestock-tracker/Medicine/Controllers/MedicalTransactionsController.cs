using System.ComponentModel;
using LivestockTracker.Abstractions.Pagination;
using LivestockTracker.Controllers;
using LivestockTracker.Exceptions;
using LivestockTracker.Medicine.ViewModels;
using LivestockTracker.Pagination;
using LivestockTracker.Properties;

namespace LivestockTracker.Medicine;

/// <summary>
///     Provides endpoints for interacting with medical transactions.
/// </summary>
public sealed class MedicalTransactionsController : LivestockApiController
{
    private readonly IMedicalTransactionManager _medicalTransactionManager;
    private readonly IMedicalTransactionSearchService _medicalTransactionSearchService;

    /// <summary>
    ///     Constructor.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="medicalTransactionManager">A service for medical transaction CRUD operations.</param>
    /// <param name="medicalTransactionSearchService">A service for performing search operations on medical transactions.</param>
    public MedicalTransactionsController(ILogger<MedicalTransactionsController> logger,
        IMedicalTransactionManager medicalTransactionManager,
        IMedicalTransactionSearchService medicalTransactionSearchService)
        : base(logger)
    {
        _medicalTransactionManager = medicalTransactionManager;
        _medicalTransactionSearchService = medicalTransactionSearchService;
    }

    /// <summary>
    ///     Gets the medical transactions for an animal.
    /// </summary>
    /// <param name="animalIds">The animals that either need to be included or excluded.</param>
    /// <param name="medicineType">The type of medicine to be included or excluded.</param>
    /// <param name="exclude">Whether the criteria should be used to include or exclude.</param>
    /// <param name="pageNumber">The number of the page.</param>
    /// <param name="pageSize">The size of each page.</param>
    /// <returns>A paged list of medical transactions for the animal.</returns>
    [HttpGet]
    [ProducesResponseType(typeof(IPagedData<MedicalTransactionViewModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public IActionResult GetAll([FromQuery] long[]? animalIds = null,
        [FromQuery] long? medicineType = null,
        [FromQuery] int pageNumber = 0,
        [FromQuery] int pageSize = 0,
        [FromQuery] bool exclude = false)
    {
        Logger.LogInformation(Resources.RequestAnimalMedicalTransactions,
            pageSize,
            animalIds ?? Enumerable.Empty<long>(),
            pageNumber);

        PagingOptions pagingOptions = new(pageNumber, pageSize == 0 ? 10 : pageSize);
        MedicalTransactionFilter filter = new(animalIds, medicineType, exclude);

        IPagedData<MedicalTransaction> result = _medicalTransactionSearchService
            .Find(filter, ListSortDirection.Descending, pagingOptions);

        PagedData<MedicalTransactionViewModel> response =
            new(result.Data.Select(transaction => transaction.ToViewModel()),
                result.PageSize,
                result.CurrentPage,
                result.TotalRecordCount);
        return Ok(response);
    }

    /// <summary>
    ///     Find the detail of a medical transaction with a given ID ensuring it belongs to the correct animal.
    /// </summary>
    /// <param name="animalId">The unique identifier of the animal.</param>
    /// <param name="id">The unique identifier of the medical transaction.</param>
    /// <returns>The detail of the medical transaction.</returns>
    [HttpGet("{animalId:long}/{id:long}")]
    [ProducesResponseType(typeof(MedicalTransactionViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    public IActionResult GetTransaction(long animalId, long id)
    {
        Logger.LogInformation(Resources.RequestMedicalTransactionDetail, animalId, id);
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        MedicalTransaction? medicalTransaction = _medicalTransactionSearchService.GetOne(id);
        return medicalTransaction == null
            ? NotFound()
            : medicalTransaction.AnimalId != animalId
                ? StatusCode(StatusCodes.Status500InternalServerError,
                    "The data retrieval service did not respond as expected.")
                : Ok(medicalTransaction.ToViewModel());
    }

    /// <summary>
    ///     Requests the updating of an existing medical transaction with the given detail.
    /// </summary>
    /// <param name="id">The unique identifier of the medical transaction.</param>
    /// <param name="desiredValues">The detail with which the medical transaction must be updated.</param>
    /// <returns>The updated medical transaction.</returns>
    [HttpPut("{id:long}")]
    [ProducesResponseType(typeof(MedicalTransactionViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateAsync(long id, [Required] UpdateMedicalTransactionViewModel desiredValues)
    {
        Logger.LogInformation(
            "Requesting the updating of medical transaction with ID {TransactionId} with values {@MedicalTransaction}...",
            id, desiredValues);

        if (id != desiredValues.Id)
        {
            ModelState.AddModelError(nameof(desiredValues.Id),
                "The id in the transaction body does match the id in the route.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            MedicalTransaction updatedTransaction = await _medicalTransactionManager
                .UpdateAsync(id, desiredValues.ToMedicalTransaction(), RequestAbortToken)
                .ConfigureAwait(false);
            return Ok(updatedTransaction.ToViewModel());
        }
        catch (ArgumentException ex)
        {
            ModelState.AddModelError(nameof(desiredValues.AnimalId), ex.Message);
            return BadRequest(ModelState);
        }
        catch (EntityNotFoundException<MedicalTransaction> ex)
        {
            return NotFound(ex.Message);
        }
    }

    /// <summary>
    ///     Requests the creation of a medical transaction with the given details.
    /// </summary>
    /// <param name="medicalTransaction">The details of the medical transaction to be created.</param>
    /// <returns>The created medical transaction.</returns>
    [HttpPost]
    [ProducesResponseType(typeof(MedicalTransactionViewModel), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddAsync(CreateMedicalTransactionViewModel medicalTransaction)
    {
        Logger.LogInformation("Requesting the creation of medical transaction {@MedicalTransaction}",
            medicalTransaction);
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            MedicalTransaction addedTransaction = await _medicalTransactionManager
                .AddAsync(medicalTransaction.ToMedicalTransaction(), RequestAbortToken)
                .ConfigureAwait(false);

            return CreatedAtAction(nameof(GetTransaction),
                new { id = addedTransaction.Id, animalId = addedTransaction.AnimalId }, addedTransaction.ToViewModel());
        }
        catch (ItemAlreadyExistsException<long> ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    ///     Request the deletion of a medical transaction with the given ID.
    /// </summary>
    /// <param name="id">The unique identifier of the medical transaction.</param>
    /// <returns>The ID of the removed medical transaction.</returns>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    public async ValueTask<IActionResult> DeleteAsync(int id)
    {
        Logger.LogInformation("Requesting the deletion of medical transaction with ID {TransactionId}...", id);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            long removedId = await _medicalTransactionManager.RemoveAsync(id, RequestAbortToken)
                .ConfigureAwait(false);
            return Ok(removedId);
        }
        catch (EntityNotFoundException<MedicalTransaction> ex)
        {
            return NotFound(ex.Message);
        }
    }
}
