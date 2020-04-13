using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Models;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace LivestockTracker.Controllers
{
    /// <summary>
    /// Provides a set of endpoints for interacting with animal information.
    /// </summary>
    public class AnimalController : LivestockApiController
    {
        private readonly IAnimalService _animalService;
        private readonly IFetchAsyncService<IAnimalSummary, int> _animalSummaryService;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="service">The service for animal operations.</param>
        /// <param name="animalSummaryService">A service for animal summary operations.</param>
        public AnimalController(ILogger<AnimalController> logger,
                                IAnimalService service,
                                IFetchAsyncService<IAnimalSummary, int> animalSummaryService)
            : base(logger)
        {

            _animalService = service;
            _animalSummaryService = animalSummaryService;
        }

        /// <summary>
        /// Requests a list of all animals sorted by number.
        /// </summary>
        /// <returns>A list of animals.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<AnimalSummary>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAnimals()
        {
            Logger.LogInformation($"Requesting all animals...");
            var animals = await _animalSummaryService.FindAsync(animal => true,
                                                                animal => animal.Number,
                                                                ListSortDirection.Ascending,
                                                                RequestAbortToken)
                                                     .ConfigureAwait(false);
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
            {
                return BadRequest();
            }

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
