using LivestockTracker.Models;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Controllers
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
            return Ok(_medicineService.Find(id));
        }

        [HttpPost]
        public IActionResult Add([Required][FromBody] MedicineType medicineType)
        {
            if (!ModelState.IsValid || medicineType == null)
            {
                return BadRequest(ModelState);
            }

            var addedItem = _medicineService.Add(medicineType);

            return CreatedAtAction(nameof(Get), new { id = addedItem.TypeCode }, medicineType);
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] MedicineType? medicineType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (medicineType == null || id != medicineType.TypeCode)
            {
                return BadRequest();
            }

            _medicineService.Update(medicineType);

            return NoContent();
        }


        [HttpPatch("{id}")]
        public IActionResult Patch([FromRoute] int id, [Required][FromBody] MedicineType medicineType)
        {
            if (!ModelState.IsValid || medicineType == null)
            {
                return BadRequest(ModelState);
            }

            if (id != medicineType.TypeCode)
            {
                return BadRequest();
            }


            var updatedMedicineType = _medicineService.Update(medicineType);

            return Ok(updatedMedicineType);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicineType = _medicineService.Find(id);
            if (medicineType == null)
            {
                return NotFound();
            }

            _medicineService.Remove(medicineType);

            return Ok(medicineType.TypeCode);
        }
    }
}
