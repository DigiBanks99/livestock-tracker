using LivestockTracker.Models;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace LivestockTracker.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class FeedingTransactionController : Controller
    {
        private readonly IFeedingTransactionService _feedingTransactionService;

        public FeedingTransactionController(IFeedingTransactionService feedingTransactionService)
        {
            _feedingTransactionService = feedingTransactionService;
        }

        [HttpGet("{animalId}")]
        public async Task<IActionResult> GetAll(int animalId)
        {
            var feedingTransactions = await _feedingTransactionService.GetByAnimalIdAsync(animalId, HttpContext.RequestAborted)
                                                                      .ConfigureAwait(false);
            return Ok(feedingTransactions);
        }

        [HttpGet("{animalId}/{id}")]
        public async Task<IActionResult> Get(int animalId, int id)
        {
            var transaction = await _feedingTransactionService.FindAsync(id, HttpContext.RequestAborted)
                                                              .ConfigureAwait(false);

            if (transaction == null)
                return NoContent();

            if (transaction.AnimalID != animalId)
                return BadRequest();

            return Ok(transaction);
        }

        [HttpPost]
        public IActionResult Save([FromBody] FeedingTransaction feedingTransaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var addedTransaction = _feedingTransactionService.Add(feedingTransaction);

            return CreatedAtAction("Get", new { id = addedTransaction.ID }, addedTransaction);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [Required][FromBody] FeedingTransaction feedingTransaction)
        {
            if (!ModelState.IsValid || feedingTransaction == null)
            {
                return BadRequest(ModelState);
            }

            if (id != feedingTransaction.ID)
            {
                return BadRequest();
            }

            _feedingTransactionService.Update(feedingTransaction);

            return NoContent();
        }

        [HttpPatch]
        public IActionResult Patch([FromBody] FeedingTransaction feedingTransaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var updatedTransaction = _feedingTransactionService.Update(feedingTransaction);
                if (updatedTransaction == null)
                {
                    return NotFound();
                }

                return Ok(updatedTransaction);
            }
            catch (EntityNotFoundException<FeedingTransaction> ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var transaction = await _feedingTransactionService.FindAsync(id, HttpContext.RequestAborted)
                                                              .ConfigureAwait(false);
            if (transaction == null)
            {
                return NotFound();
            }

            _feedingTransactionService.Remove(transaction);

            return Ok(transaction.ID);
        }
    }
}
