using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Models.Medical;
using LivestockTracker.Medicine;
using LivestockTracker.Models.Paging;
using LivestockTracker.Properties;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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

        var pagingOptions = new PagingOptions
        {
            PageNumber = pageNumber,
            PageSize = pageSize == 0 ? 10 : pageSize
        };

        var filter = new MedicalTransactionFilter(animalIds, medicineType, exclude);

        var items = _medicalTransactionSearchService.Find(filter, ListSortDirection.Descending, pagingOptions);
        return Ok(items);
    }

    /// <summary>
    /// Find the detail of a medical transaction with a given ID ensuring it belongs to the correct animal.
    /// </summary>
    /// <param name="animalId">The unique identifier of the animal.</param>
    /// <param name="id">The unique identifier of the medical transaction.</param>
    /// <returns>The detail of the medical transaction.</returns>
    [HttpGet("{animalId}/{id}")]
    [ProducesResponseType(typeof(MedicalTransaction), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    public IActionResult Get(int animalId, int id)
    {
        Logger.LogInformation(Resources.RequestMedicalTransactionDetail, animalId, id);
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var medicalTransaction = _medicalTransactionSearchService.GetOne(id);
        if (medicalTransaction == null)
        {
            return NotFound();
        }

        if (medicalTransaction.AnimalId != animalId)
        {
            return BadRequest();
        }

        return Ok(medicalTransaction);
    }

    /// <summary>
    /// Requests the updating of an existing medical transaction with the given detail.
    /// </summary>
    /// <param name="id">The unique identifier of the medical transaction.</param>
    /// <param name="medicalTransaction">The detail with which the medical transaction must be updated.</param>
    /// <returns>The updated medical transaction.</returns>
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(MedicalTransaction), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, [Required] MedicalTransaction medicalTransaction)
    {
        Logger.LogInformation("Requesting the updating of medical transaction with ID {transactionId} with values {medicalTransaction}...", id, medicalTransaction);

        if (medicalTransaction == null)
        {
            ModelState.AddModelError(nameof(medicalTransaction), $"{nameof(medicalTransaction)} is required.");
            return BadRequest(ModelState);
        }

        if (id != medicalTransaction.Id)
        {
            ModelState.AddModelError(nameof(medicalTransaction.Id), "The id in the transaction body does match the id in the route.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        try
        {
            var updatedTransaction = await _medicalTransactionCrudService.UpdateAsync(medicalTransaction, RequestAbortToken)
                                                                         .ConfigureAwait(false);
            return Ok(updatedTransaction);
        }
        catch (EntityNotFoundException<IMedicalTransaction> ex)
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
        Logger.LogInformation("Requesting the creation of medical transaction {medicalTransaction}", medicalTransaction);
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var addedTransaction = await _medicalTransactionCrudService.AddAsync(medicalTransaction, RequestAbortToken)
                                                                   .ConfigureAwait(false);

        return CreatedAtAction(nameof(Get), new { id = addedTransaction.Id, animalId = addedTransaction.AnimalId }, addedTransaction);
    }

    /// <summary>
    /// Request the deletion of a medical transaction with the given ID.
    /// </summary>
    /// <param name="id">The unique identifier of the medical transaction.</param>
    /// <returns>The ID of the removed medical transaction.</returns>
    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    public async ValueTask<IActionResult> Delete(int id)
    {
        Logger.LogInformation("Requesting the deletion of medical transaction with ID {transactionId}...", id);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var removedId = await _medicalTransactionCrudService.RemoveAsync(id, RequestAbortToken)
                                                                .ConfigureAwait(false);
            return Ok(removedId);
        }
        catch (EntityNotFoundException<IMedicalTransaction> ex)
        {
            return NotFound(ex.Message);
        }
    }
}
