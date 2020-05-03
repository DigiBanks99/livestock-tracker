using LivestockTracker.Models.Medical;
using LivestockTracker.Properties;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace LivestockTracker.Controllers
{
    [Route("api/[controller]")]
    public class MedicalTransactionsController : LivestockApiController
    {
        private readonly IMedicalService _medicalService;

        public MedicalTransactionsController(ILogger<MedicalTransactionsController> logger, IMedicalService medicalService)
            : base(logger)
        {
            _medicalService = medicalService;
        }

        /// <summary>
        /// Gets the medical transactions for an animal.
        /// </summary>
        /// <param name="animalId">The unique identifier that links the medical transactions.</param>
        /// <returns>The list of transactions for the animal.</returns>
        [HttpGet("{animalId}")]
        [ProducesResponseType(typeof(IEnumerable<MedicalTransaction>), StatusCodes.Status200OK)]
        public async ValueTask<IActionResult> GetMedicalTransactions([FromRoute] int animalId)
        {
            Logger.LogInformation(Resources.RequestAnimalMedicalTransactions, animalId);
            var items = await _medicalService.GetByAnimalIdAsync(animalId, Request.HttpContext.RequestAborted)
                                             .ConfigureAwait(false);
            return Ok(items);
        }

        // GET: api/MedicalTransactions/5
        [HttpGet("{animalId}/{id}")]
        public async ValueTask<IActionResult> GetMedicalTransaction([FromRoute] int animalId, [FromRoute] int id)
        {
            Logger.LogInformation(Resources.RequestMedicalTransactionDetail, animalId, id);
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

            if (medicalTransaction.AnimalId != animalId)
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

            if (id != medicalTransaction.Id)
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

            if (id != medicalTransaction.Id)
            {
                return BadRequest();
            }

            var updatedMedicalTransaction = _medicalService.Update(medicalTransaction);

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

            var addedTransaction = _medicalService.Add(medicalTransaction);

            return CreatedAtAction(nameof(GetMedicalTransaction), new { id = addedTransaction.Id, animalID = addedTransaction.AnimalId }, medicalTransaction);
        }

        // DELETE: api/MedicalTransactions/5
        [HttpDelete("{id}")]
        public async ValueTask<IActionResult> DeleteMedicalTransaction([FromRoute] int id)
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

            _medicalService.Remove(medicalTransaction);

            return Ok(medicalTransaction.Id);
        }
    }
}
