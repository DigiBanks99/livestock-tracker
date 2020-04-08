using LivestockTracker.Models;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace LivestockTracker.Controllers
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
        public async ValueTask<IActionResult> GetMedicalTransactions([FromRoute] int animalID)
        {
            var items = await _medicalService.GetByAnimalIdAsync(animalID, Request.HttpContext.RequestAborted)
                                             .ConfigureAwait(false);
            return Ok(items);
        }

        // GET: api/MedicalTransactions/5
        [HttpGet("{animalID}/{id}")]
        public async ValueTask<IActionResult> GetMedicalTransaction([FromRoute] int animalID, [FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicalTransaction = await _medicalService.FindAsync(id, Request.HttpContext.RequestAborted)
                                                          .ConfigureAwait(false);
            if (medicalTransaction == null)
            {
                return NotFound();
            }

            if (medicalTransaction.AnimalID != animalID)
            {
                return BadRequest();
            }

            return Ok(medicalTransaction);
        }

        // PUT: api/MedicalTransactions/5
        [HttpPut("{id}")]
        public IActionResult PutMedicalTransaction([FromRoute] int id, [Required][FromBody] MedicalTransaction medicalTransaction)
        {
            if (!ModelState.IsValid || medicalTransaction == null)
            {
                return BadRequest(ModelState);
            }

            if (id != medicalTransaction.ID)
            {
                return BadRequest();
            }

            _medicalService.Update(medicalTransaction);

            return NoContent();
        }
        [HttpPatch("{id}")]
        public IActionResult PatchMedicalTransaction([FromRoute] int id, [Required][FromBody] MedicalTransaction medicalTransaction)
        {
            if (!ModelState.IsValid || medicalTransaction == null)
            {
                return BadRequest(ModelState);
            }

            if (id != medicalTransaction.ID)
            {
                return BadRequest();
            }

            MedicalTransaction updatedMedicalTransaction = _medicalService.Update(medicalTransaction);

            return Ok(updatedMedicalTransaction);
        }

        // POST: api/MedicalTransactions
        [HttpPost]
        public IActionResult PostMedicalTransaction([FromBody] MedicalTransaction medicalTransaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MedicalTransaction addedTransaction = _medicalService.Add(medicalTransaction);

            return CreatedAtAction(nameof(GetMedicalTransaction), new { id = addedTransaction.ID, animalID = addedTransaction.AnimalID }, medicalTransaction);
        }

        // DELETE: api/MedicalTransactions/5
        [HttpDelete("{id}")]
        public async ValueTask<IActionResult> DeleteMedicalTransaction([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MedicalTransaction medicalTransaction = await _medicalService.FindAsync(id, Request.HttpContext.RequestAborted)
                                                    .ConfigureAwait(false);
            if (medicalTransaction == null)
            {
                return NotFound();
            }

            _medicalService.Remove(medicalTransaction);

            return Ok(medicalTransaction.ID);
        }
    }
}
