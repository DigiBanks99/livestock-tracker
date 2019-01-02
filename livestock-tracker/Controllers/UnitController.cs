using LivestockTracker;
using LivestockTracker.Models;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace livestock_tracker.Controllers
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
      return Ok(_unitService.GetAll());
    }

    // GET: api/Unit/5
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
      return Ok(_unitService.Get(id));
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
      _unitService.Save();

      return CreatedAtAction("Get", new { id = savedUnit.TypeCode }, savedUnit);
    }

    // PUT: api/Unit/5
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Unit unit)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != unit.TypeCode)
      {
        return BadRequest();
      }

      _unitService.Update(unit);

      try
      {
        _unitService.Save();
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

    [HttpPatch("{id}")]
    public IActionResult Patch(int id, [FromBody] Unit unit)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != unit.TypeCode)
      {
        return BadRequest();
      }

      Unit updatedUnit = null;

      try
      {
        updatedUnit = _unitService.Update(unit);
        _unitService.Save();
      }
      catch (EntityNotFoundException<Unit> ex)
      {
        return NotFound(ex.Message);
      }
      catch (DbUpdateConcurrencyException)
      {
        if (updatedUnit == null)
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

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

      var unit = _unitService.Get(id);
      if (unit == null)
      {
        return NotFound();
      }

      _unitService.Remove(unit);
      _unitService.Save();

      return Ok(unit.TypeCode);
    }
  }
}
