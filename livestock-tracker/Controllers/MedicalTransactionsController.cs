using LivestockTracker.Models;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace livestock_tracker.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MedicalTransactionsController : Controller
    {
        private readonly IMedicalService _medicalService;

        public MedicalTransactionsController(IMedicalService medicalService)
        {
            _medicalService = medicalService;
        }

        // GET: api/MedicalTransactions
        [HttpGet("{animalID}")]
        public IActionResult GetMedicalTransactions([FromRoute] int animalID)
        {
            return Ok(_medicalService.GetByAnimalID(animalID));
        }

        // GET: api/MedicalTransactions/5
        [HttpGet("{animalID}/{id}")]
        public IActionResult GetMedicalTransaction([FromRoute] int animalID, [FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicalTransaction = _medicalService.Get(id);

            if (medicalTransaction == null)
            {
                return NotFound();
            }

            return Ok(medicalTransaction);
        }

        // PUT: api/MedicalTransactions/5
        [HttpPut("{id}")]
        public IActionResult PutMedicalTransaction([FromRoute] int id, [FromBody] MedicalTransaction medicalTransaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != medicalTransaction.ID)
            {
                return BadRequest();
            }

            _medicalService.Update(medicalTransaction);

            try
            {
                _medicalService.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicalTransactionExists(id))
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

        // POST: api/MedicalTransactions
        [HttpPost]
        public IActionResult PostMedicalTransaction([FromBody] MedicalTransaction medicalTransaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _medicalService.Add(medicalTransaction);
            _medicalService.Save();

            return CreatedAtAction("GetMedicalTransaction", new { id = medicalTransaction.ID, animalID = medicalTransaction.AnimalID }, medicalTransaction);
        }

        // DELETE: api/MedicalTransactions/5
        [HttpDelete("{id}")]
        public IActionResult DeleteMedicalTransaction([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicalTransaction = _medicalService.Get(id);
            if (medicalTransaction == null)
            {
                return NotFound();
            }

            _medicalService.Remove(medicalTransaction);
            _medicalService.Save();

            return Ok(medicalTransaction);
        }

        private bool MedicalTransactionExists(int id)
        {
            return _medicalService.Get(id) != null;
        }
    }
}
