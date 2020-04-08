using LivestockTracker.Models;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AnimalController : Controller
    {
        private readonly IAnimalService _animalService;
        public AnimalController(IAnimalService service)
        {
            _animalService = service;
        }

        public CancellationToken RequestAbortToken => Request.HttpContext.RequestAborted;

        [HttpGet]
        public async Task<IActionResult> GetAnimals()
        {
            var animals = await _animalService.GetAllAsync(RequestAbortToken).ConfigureAwait(false);
            return Ok(animals);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            var animal = await _animalService.FindAsync(id, RequestAbortToken).ConfigureAwait(false);
            return Ok(animal);
        }

        [HttpPost]
        public IActionResult AddAnimal([Required][FromBody]Animal animal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var savedAnimal = _animalService.Add(animal);
            return CreatedAtAction("Get", new { id = savedAnimal.ID }, savedAnimal);
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateAnimal([FromRoute] int id, [Required][FromBody]Animal animal)
        {
            if (!ModelState.IsValid || animal == null)
                return BadRequest();

            try
            {
                if (id != animal.ID)
                {
                    return BadRequest();
                }

                var savedAnimal = _animalService.Update(animal);
                return Ok(savedAnimal);
            }
            catch (EntityNotFoundException<Animal> ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete]
        public IActionResult DeleteAnimal(int id)
        {
            _animalService.Remove(id);
            return Ok(id);
        }
    }
}
