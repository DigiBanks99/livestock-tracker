using LivestockTracker.Database;
using LivestockTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace livestock_tracker.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MedicalTransactionsController : Controller
    {
        private readonly LivestockContext _context;

        public MedicalTransactionsController(LivestockContext context)
        {
            _context = context;
        }

        // GET: api/MedicalTransactions
        [HttpGet("{animalID}")]
        public IEnumerable<MedicalTransaction> GetMedicalTransactions([FromRoute] int animalID)
        {
            return _context.MedicalTransactions.Where(m => m.AnimalID == animalID);
        }

        // GET: api/MedicalTransactions/5
        [HttpGet("{animalID}/{id}")]
        public async Task<IActionResult> GetMedicalTransaction([FromRoute] int animalID, [FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicalTransaction = await _context.MedicalTransactions.SingleOrDefaultAsync(m => m.ID == id);

            if (medicalTransaction == null)
            {
                return NotFound();
            }

            return Ok(medicalTransaction);
        }

        // PUT: api/MedicalTransactions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedicalTransaction([FromRoute] int id, [FromBody] MedicalTransaction medicalTransaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != medicalTransaction.ID)
            {
                return BadRequest();
            }

            _context.Entry(medicalTransaction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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
        public async Task<IActionResult> PostMedicalTransaction([FromBody] MedicalTransaction medicalTransaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MedicalTransactions.Add(medicalTransaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedicalTransaction", new { id = medicalTransaction.ID }, medicalTransaction);
        }

        // DELETE: api/MedicalTransactions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicalTransaction([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicalTransaction = await _context.MedicalTransactions.SingleOrDefaultAsync(m => m.ID == id);
            if (medicalTransaction == null)
            {
                return NotFound();
            }

            _context.MedicalTransactions.Remove(medicalTransaction);
            await _context.SaveChangesAsync();

            return Ok(medicalTransaction);
        }

        private bool MedicalTransactionExists(int id)
        {
            return _context.MedicalTransactions.Any(e => e.ID == id);
        }
    }
}