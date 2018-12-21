using LivestockTracker;
using LivestockTracker.Database;
using LivestockTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace livestock_tracker.Controllers
{
  [Produces("application/json")]
  [Route("api/FeedingTransaction")]
  public class FeedingTransactionController : Controller
  {
    private readonly IFeedingTransactionRepository _feedingTransactionRepository;

    public FeedingTransactionController(IFeedingTransactionRepository feedingTransactionRepository)
    {
      _feedingTransactionRepository = feedingTransactionRepository;
    }

    [HttpGet("{animalID}")]
    [Route("getAll/{animalID}")]
    public IActionResult GetAll([FromRoute] int animalID)
    {
      return Ok(_feedingTransactionRepository.Find(x => x.AnimalID == animalID));
    }

    [HttpGet("{id}")]
    [Route("get/{id}")]
    public IActionResult Get(int id)
    {
      return Ok(_feedingTransactionRepository.Get(id));
    }

    [HttpPost]
    public IActionResult Save([FromBody] FeedingTransaction feedingTransaction)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      _feedingTransactionRepository.Add(feedingTransaction);
      _feedingTransactionRepository.SaveChanges();

      return CreatedAtAction("Get", new { id = feedingTransaction.ID }, feedingTransaction);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] FeedingTransaction feedingTransaction)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != feedingTransaction.ID)
      {
        return BadRequest();
      }

      _feedingTransactionRepository.Update(feedingTransaction);

      try
      {
        _feedingTransactionRepository.SaveChanges();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (Get(id) == null)
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

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
        _feedingTransactionRepository.Update(feedingTransaction);
        _feedingTransactionRepository.SaveChanges();
        var updatedTransaction = Get(feedingTransaction.ID);
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

      var unit = _feedingTransactionRepository.Get(id);
      if (unit == null)
      {
        return NotFound();
      }

      _feedingTransactionRepository.Remove(unit);
      _feedingTransactionRepository.SaveChanges();

      return Ok(unit);
    }
  }
}
