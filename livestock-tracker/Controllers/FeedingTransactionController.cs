using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Models.Feed;
using LivestockTracker.Abstractions.Services.Feed;
using LivestockTracker.Models;
using LivestockTracker.Models.Paging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace LivestockTracker.Controllers
{
    /// <summary>
    /// Provides endpoints for interacting with feeding transactions.
    /// </summary>
    public class FeedingTransactionController : LivestockApiController
    {
        private readonly IFeedingTransactionCrudService _feedingTransactionService;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="feedingTransactionService">Provides general services for feeding transactions.</param>
        public FeedingTransactionController(ILogger<FeedingTransactionController> logger, IFeedingTransactionCrudService feedingTransactionService)
            : base(logger)
        {
            _feedingTransactionService = feedingTransactionService;
        }

        /// <summary>
        /// Requests a paged list of feeding transactions that belong to an animal.
        /// </summary>
        /// <param name="animalId">The identifying key for the animal.</param>
        /// <param name="pageNumber">The number of the page.</param>
        /// <param name="pageSize">The size of each page.</param>
        /// <returns>A paged list of feeding transaction that belong to an animal.</returns>
        [HttpGet("{animalId}")]
        [ProducesResponseType(typeof(IPagedData<FeedingTransaction>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAll([Required] int animalId, int pageNumber = 0, int pageSize = 100)
        {
            Logger.LogInformation($"Requesting {pageSize} feeding transactions for animal with ID {animalId} from page {pageNumber}...");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var feedingTransactions = await _feedingTransactionService.FindAsync(feedingTransaction => feedingTransaction.AnimalId == animalId,
                                                                                 feedingTransaction => feedingTransaction.TransactionDate,
                                                                                 ListSortDirection.Descending,
                                                                                 new PagingOptions
                                                                                 {
                                                                                     PageNumber = pageNumber,
                                                                                     PageSize = pageSize
                                                                                 },
                                                                                 RequestAbortToken)
                                                                      .ConfigureAwait(false);
            return Ok(feedingTransactions);
        }

        /// <summary>
        /// Find the detail of a feeding transaction with a given ID ensuring it belongs to the correct animal.
        /// </summary>
        /// <param name="animalId">The unique identifier of the animal.</param>
        /// <param name="id">The unique identifier of the feeding transaction.</param>
        /// <returns>The detail of the feeding transaction.</returns>
        [HttpGet("{animalId}/{id}")]
        [ProducesResponseType(typeof(FeedingTransaction), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get(int animalId, int id)
        {
            Logger.LogInformation($"Requesting the detail for feeding transaction with ID {id} for the animal with ID {animalId}...");

            try
            {
                var transaction = await _feedingTransactionService.GetOneAsync(id, RequestAbortToken)
                                                                  .ConfigureAwait(false);

                if (transaction == null)
                    return NotFound();

                if (transaction.AnimalId != animalId)
                    return BadRequest();

                return Ok(transaction);
            }
            catch (EntityNotFoundException<IFeedingTransaction> ex)
            {
                return NotFound(ex.Message);
            }
        }

        /// <summary>
        /// Requests the creation of a feeding transaction with the given details.
        /// </summary>
        /// <param name="feedingTransaction">The details of the feeding transaction to be created.</param>
        /// <returns>The created feeding transaction.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(FeedingTransaction), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Add([FromBody] FeedingTransaction feedingTransaction)
        {
            Logger.LogInformation($"Requesting the creation of feeding transaction {feedingTransaction}");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var addedTransaction = await _feedingTransactionService.AddAsync(feedingTransaction, RequestAbortToken)
                                                                   .ConfigureAwait(false);

            return CreatedAtAction(nameof(Get), new { id = addedTransaction.Id, animalId = addedTransaction.AnimalId }, addedTransaction);
        }

        /// <summary>
        /// Requests the updating of an existing feeding transaction with the given detail.
        /// </summary>
        /// <param name="id">The unique identifier of the feeding transaction.</param>
        /// <param name="feedingTransaction">The detail with which the feeding transaction must be updated.</param>
        /// <returns>The updated feeding transaction.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(FeedingTransaction), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Put(int id, [Required][FromBody] FeedingTransaction feedingTransaction)
        {
            Logger.LogInformation($"Requesting the updating of feeding transaction with ID {id} with values {feedingTransaction}...");

            if (feedingTransaction == null)
            {
                ModelState.AddModelError(nameof(feedingTransaction), $"{nameof(feedingTransaction)} is required.");
                return BadRequest(ModelState);
            }

            if (id != feedingTransaction.Id)
            {
                ModelState.AddModelError(nameof(feedingTransaction.Id), "The id in the transaction body does match the id in the route.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var updatedTransaction = await _feedingTransactionService.UpdateAsync(feedingTransaction, RequestAbortToken)
                                                                         .ConfigureAwait(false);
                return Ok(updatedTransaction);
            }
            catch (EntityNotFoundException<IFeedingTransaction> ex)
            {
                return NotFound(ex.Message);
            }
        }

        /// <summary>
        /// Request the deletion of a feeding transaction with the given ID.
        /// </summary>
        /// <param name="id">The unique identifier of the feeding transaction.</param>
        /// <returns>The ID of the removed feeding transaction.</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Logger.LogInformation($"Requesting the deletion of feeding transaction with ID {id}...");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var removedId = await _feedingTransactionService.RemoveAsync(id, RequestAbortToken)
                                                                    .ConfigureAwait(false);
                return Ok(removedId);
            }
            catch (EntityNotFoundException<IFeedingTransaction> ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
