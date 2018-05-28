using LivestockTracker.Models;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace livestock_tracker.Controllers
{
    [Produces("application/json")]
    [Route("api/Medecine")]
    public class MedecineController : Controller
    {
        private readonly IMedecineService _medecineService;

        public MedecineController(IMedecineService medecineService)
        {
            _medecineService = medecineService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_medecineService.GetAll());
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            return Ok(_medecineService.Get(id));
        }

        [HttpPost]
        public IActionResult Add([FromBody] MedecineType medecineType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _medecineService.Add(medecineType);
            _medecineService.Save();

            return CreatedAtAction("Get", new { id = medecineType.TypeCode }, medecineType);
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] MedecineType medecineType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != medecineType.TypeCode)
            {
                return BadRequest();
            }

            _medecineService.Update(medecineType);

            try
            {
                _medecineService.Save();
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

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medecineType = _medecineService.Get(id);
            if (medecineType == null)
            {
                return NotFound();
            }

            _medecineService.Remove(medecineType);
            _medecineService.Save();

            return Ok(medecineType);
        }
    }
}
