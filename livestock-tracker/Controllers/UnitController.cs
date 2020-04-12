using LivestockTracker.Models;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace LivestockTracker.Controllers
{
    [Produces("application/json")]
    [Route("api/Unit")]
    public class UnitController : Controller
    {
        private readonly IUnitService _unitService;

        public UnitController(IUnitService unitService)
        {
            _unitService = unitService;
        }

        // GET: api/Unit
        [HttpGet]
        public IActionResult Get()
        {
            var units = _unitService.GetAll().OrderBy(u => u.Description);
            return Ok(units);
        }

        // GET: api/Unit/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_unitService.Find(id));
        }

        // POST: api/Unit
        [HttpPost]
        public IActionResult Post([FromBody] Unit unit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var savedUnit = _unitService.Add(unit);

            return CreatedAtAction(nameof(Get), new { id = savedUnit.TypeCode }, savedUnit);
        }

        // PUT: api/Unit/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Unit? unit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (unit == null || id != unit.TypeCode)
            {
                return BadRequest();
            }

            _unitService.Update(unit);

            return NoContent();
        }

        [HttpPatch("{id}")]
        public IActionResult Patch(int id, [FromBody] Unit unit)
        {
            if (!ModelState.IsValid || unit == null)
            {
                return BadRequest(ModelState);
            }

            if (id != unit.TypeCode)
            {
                return BadRequest();
            }

            var updatedUnit = _unitService.Update(unit);

            return Ok(updatedUnit);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var unit = _unitService.Find(id);
            if (unit == null)
            {
                return NotFound();
            }

            _unitService.Remove(unit);

            return Ok(unit.TypeCode);
        }
    }
}
