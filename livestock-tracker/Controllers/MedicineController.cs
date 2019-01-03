using LivestockTracker;
using LivestockTracker.Models;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace livestock_tracker.Controllers
{
  [Produces("application/json")]
  [Route("api/[controller]")]
  public class MedicineController : Controller
  {
    private readonly IMedicineService _medicineService;

    public MedicineController(IMedicineService medicineService)
    {
      _medicineService = medicineService;
    }

    [HttpGet]
    public IActionResult Get()
    {
      return Ok(_medicineService.GetAll());
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
      return Ok(_medicineService.Get(id));
    }

    [HttpPost]
    public IActionResult Add([FromBody] MedicineType medicineType)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      _medicineService.Add(medicineType);
      _medicineService.Save();

      return CreatedAtAction("Get", new { id = medicineType.TypeCode }, medicineType);
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromRoute] int id, [FromBody] MedicineType medicineType)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != medicineType.TypeCode)
      {
        return BadRequest();
      }

      _medicineService.Update(medicineType);

      try
      {
        _medicineService.Save();
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
    public IActionResult Patch([FromRoute] int id, [FromBody] MedicineType medicineType)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != medicineType.TypeCode)
      {
        return BadRequest();
      }


      MedicineType updatedMedicineType = null;
      try
      {
        _medicineService.Update(medicineType);
        _medicineService.Save();
        updatedMedicineType = _medicineService.Get(medicineType.TypeCode);
      }
      catch (EntityNotFoundException<MedicineType> ex)
      {
        return NotFound(ex.Message);
      }
      catch (DbUpdateConcurrencyException)
      {
        if (updatedMedicineType == null)
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return Ok(updatedMedicineType);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var medicineType = _medicineService.Get(id);
      if (medicineType == null)
      {
        return NotFound();
      }

      _medicineService.Remove(medicineType);
      _medicineService.Save();

      return Ok(medicineType.TypeCode);
    }
  }
}
