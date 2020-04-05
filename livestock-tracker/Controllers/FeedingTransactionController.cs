using LivestockTracker.Models;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace LivestockTracker.Controllers
{
    [Produces("application/json")]
    [Route("api/FeedingTransaction")]
    public class FeedingTransactionController : Controller
    {
        private readonly IFeedingTransactionService _feedingTransactionService;

        public FeedingTransactionController(IFeedingTransactionService feedingTransactionService)
        {
            _feedingTransactionService = feedingTransactionService;
        }

        [HttpGet("{animalID}")]
        public async Task<IActionResult> GetAll(int animalID)
        {
            System.Collections.Generic.IEnumerable<FeedingTransaction> feedingTransactions = await _feedingTransactionService.GetByAnimalIdAsync(animalID, Request.HttpContext.RequestAborted).ConfigureAwait(false);
            return Ok(feedingTransactions);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_feedingTransactionService.Find(id));
        }

        [HttpPost]
        public IActionResult Save([FromBody] FeedingTransaction feedingTransaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            FeedingTransaction addedTransaction = _feedingTransactionService.Add(feedingTransaction);

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
                FeedingTransaction updatedTransaction = _feedingTransactionService.Update(feedingTransaction);
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
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            FeedingTransaction transaction = _feedingTransactionService.Find(id);
            if (transaction == null)
            {
                return NotFound();
            }

            _feedingTransactionService.Remove(transaction);

            return Ok(transaction.ID);
        }
    }
}
