using LivestockTracker.Models;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace LivestockTracker.Controllers
{
    [Produces("application/json")]
    [Route("api/FeedType")]
    public class FeedTypeController : Controller
    {
        private readonly IFeedTypeService _feedTypeService;

        public FeedTypeController(IFeedTypeService feedTypeService)
        {
            _feedTypeService = feedTypeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _feedTypeService.GetAllAsync(Request.HttpContext.RequestAborted).ConfigureAwait(false);
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var item = await _feedTypeService.FindAsync(id, Request.HttpContext.RequestAborted).ConfigureAwait(false);
            return Ok(item);
        }

        [HttpPost]
        public IActionResult Save([FromBody] FeedType feedType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var addedItem = _feedTypeService.Add(feedType);

            return CreatedAtAction(nameof(Get), new { id = addedItem.ID }, feedType);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [Required][FromBody] FeedType feedType)
        {
            if (!ModelState.IsValid || feedType == null)
            {
                return BadRequest(ModelState);
            }

            if (id != feedType.ID)
            {
                return BadRequest();
            }

            _feedTypeService.Update(feedType);

            return NoContent();
        }

        [HttpPatch("{id}")]
        public IActionResult Patch(int id, [Required][FromBody] FeedType feedType)
        {
            if (!ModelState.IsValid || feedType == null)
            {
                return BadRequest(ModelState);
            }

            if (id != feedType.ID)
            {
                return BadRequest();
            }


            var updatedFeedType = _feedTypeService.Update(feedType);
            return Ok(updatedFeedType);
        }

        [HttpDelete("{id}")]
        public async ValueTask<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var unit = await _feedTypeService.FindAsync(id, Request.HttpContext.RequestAborted)
                                             .ConfigureAwait(false);
            if (unit == null)
            {
                return NotFound();
            }

            _feedTypeService.Remove(unit);

            return Ok(unit.ID);
        }
    }
}
