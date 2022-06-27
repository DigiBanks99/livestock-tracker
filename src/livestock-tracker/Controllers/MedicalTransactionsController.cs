using LivestockTracker.Abstractions.Models;
using LivestockTracker.Medicine;
using LivestockTracker.Models.Paging;
using LivestockTracker.Properties;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LivestockTracker.Controllers;

/// <summary>
/// Provides endpoints for interacting with medical transactions.
/// </summary>
public class MedicalTransactionsController : LivestockApiController
{
    private readonly IMedicalTransactionCrudService _medicalTransactionCrudService;
    private readonly IMedicalTransactionSearchService _medicalTransactionSearchService;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="medicalTransactionCrudService">A service for medical transaction CRUD operations.</param>
    /// <param name="medicalTransactionSearchService">A service for performing search operations on medical transactions.</param>
    public MedicalTransactionsController(ILogger<MedicalTransactionsController> logger,
                                         IMedicalTransactionCrudService medicalTransactionCrudService,
                                         IMedicalTransactionSearchService medicalTransactionSearchService)
        : base(logger)
    {
        _medicalTransactionCrudService = medicalTransactionCrudService;
        _medicalTransactionSearchService = medicalTransactionSearchService;
    }

    /// <summary>
    /// Gets the medical transactions for an animal.
    /// </summary>
    /// <param name="animalIds">The animals that either need to be included or excluded.</param>
    /// <param name="medicineType">The type of medicine to be included or excluded.</param>
    /// <param name="exclude">Whether the criteria should be used to include or exclude.</param>
    /// <param name="pageNumber">The number of the page.</param>
    /// <param name="pageSize">The size of each page.</param>
    /// <returns>A paged list of medical transactions for the animal.</returns>
    [HttpGet]
    [ProducesResponseType(typeof(IPagedData<MedicalTransaction>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public IActionResult GetAllAsync([FromQuery] long[]? animalIds = null,
                                [FromQuery] long? medicineType = null,
                                [FromQuery] int pageNumber = 0,
                                [FromQuery] int pageSize = 0,
                                [FromQuery] bool exclude = false)
    {
        Logger.LogInformation(Resources.RequestAnimalMedicalTransactions,
                              pageSize,
                              animalIds ?? Enumerable.Empty<long>(),
                              pageNumber);

        PagingOptions pagingOptions = new()
        {
            PageNumber = pageNumber,
            PageSize = pageSize == 0 ? 10 : pageSize
        };

        MedicalTransactionFilter filter = new(animalIds, medicineType, exclude);

        IPagedData<MedicalTransaction> items = _medicalTransactionSearchService.Find(filter, ListSortDirection.Descending, pagingOptions);
        return Ok(items);
    }

    /// <summary>
    /// Find the detail of a medical transaction with a given ID ensuring it belongs to the correct animal.
    /// </summary>
    /// <param name="animalId">The unique identifier of the animal.</param>
    /// <param name="id">The unique identifier of the medical transaction.</param>
    /// <returns>The detail of the medical transaction.</returns>
    [HttpGet("{animalId:long}/{id:long}")]
    [ProducesResponseType(typeof(MedicalTransaction), StatusCodes.Status200OK)]
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
            ? StatusCode(StatusCodes.Status500InternalServerError, "The data retrieval service did not respond as expected.")
            : Ok(medicalTransaction);
    }

    /// <summary>
    /// Requests the updating of an existing medical transaction with the given detail.
    /// </summary>
    /// <param name="id">The unique identifier of the medical transaction.</param>
    /// <param name="medicalTransaction">The detail with which the medical transaction must be updated.</param>
    /// <returns>The updated medical transaction.</returns>
    [HttpPut("{id:long}")]
    [ProducesResponseType(typeof(MedicalTransaction), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateAsync(long id, [Required] MedicalTransaction medicalTransaction)
    {
        Logger.LogInformation("Requesting the updating of medical transaction with ID {TransactionId} with values {@MedicalTransaction}...", id, medicalTransaction);

        if (id != medicalTransaction.Id)
        {
            ModelState.AddModelError(nameof(medicalTransaction.Id), "The id in the transaction body does match the id in the route.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            MedicalTransaction updatedTransaction = await _medicalTransactionCrudService.UpdateAsync(medicalTransaction, RequestAbortToken)
                                                                                        .ConfigureAwait(false);
            return Ok(updatedTransaction);
        }
        catch (ArgumentException ex)
        {
            ModelState.AddModelError(nameof(medicalTransaction.AnimalId), ex.Message);
            return BadRequest(ModelState);
        }
        catch (EntityNotFoundException<MedicalTransaction> ex)
        {
            return NotFound(ex.Message);
        }
    }

    /// <summary>
    /// Requests the creation of a medical transaction with the given details.
    /// </summary>
    /// <param name="medicalTransaction">The details of the medical transaction to be created.</param>
    /// <returns>The created medical transaction.</returns>
    [HttpPost]
    [ProducesResponseType(typeof(MedicalTransaction), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddAsync(MedicalTransaction medicalTransaction)
    {
        Logger.LogInformation("Requesting the creation of medical transaction {@MedicalTransaction}", medicalTransaction);
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            MedicalTransaction addedTransaction = await _medicalTransactionCrudService.AddAsync(medicalTransaction, RequestAbortToken)
                                                                                      .ConfigureAwait(false);

            return CreatedAtAction(nameof(GetTransaction), new { id = addedTransaction.Id, animalId = addedTransaction.AnimalId }, addedTransaction);
        }
        catch (ItemAlreadyExistsException<long> ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Request the deletion of a medical transaction with the given ID.
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
            long removedId = await _medicalTransactionCrudService.RemoveAsync(id, RequestAbortToken)
                                                                 .ConfigureAwait(false);
            return Ok(removedId);
        }
        catch (EntityNotFoundException<MedicalTransaction> ex)
        {
            return NotFound(ex.Message);
        }
    }
}
