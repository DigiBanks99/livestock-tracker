using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Services.Animals;
using LivestockTracker.Controllers;
using LivestockTracker.Models.Animals;
using LivestockTracker.Models.Paging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace LivestockTracker.Animals
{
    /// <summary>
    /// Provides a set of endpoints for interacting with animal information.
    /// </summary>
    public class AnimalController : LivestockApiController
    {
        private readonly IAnimalCrudService _animalCrudService;
        private readonly IAnimalSearchService _animalSummaryService;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="animalCrudService">The service for animal CRUD operations.</param>
        /// <param name="animalSummaryService">A service for animal summary operations.</param>
        public AnimalController(ILogger<AnimalController> logger,
                                IAnimalCrudService animalCrudService,
                                IAnimalSearchService animalSummaryService)
            : base(logger)
        {
            _animalCrudService = animalCrudService;
            _animalSummaryService = animalSummaryService;
        }

        /// <summary>
        /// Requests a paged list of all animals sorted by number.
        /// </summary>
        /// <param name="pagingOptions">Options relating to paging the request results.</param>
        /// <param name="orderingOptions">Options relating to ordering the request results.</param>
        /// <param name="includeArchived">Include archived animals in the results.</param>
        /// <returns>A paged list of animals.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IPagedData<AnimalSummary>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public IActionResult GetAnimals([FromQuery] PagingOptions pagingOptions, [FromQuery] OrderingOptions<AnimalOrderType> orderingOptions, bool? includeArchived = false)
        {
            Logger.LogInformation($"Requesting {pagingOptions.PageSize} animals from page {pagingOptions.PageNumber}...");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var filter = new AnimalSummaryFilter
            {
                IncludeArchived = includeArchived
            };

            var animals = _animalSummaryService.SearchPaged(filter, pagingOptions, orderingOptions);
            return Ok(animals);
        }

        /// <summary>
        /// Requests the basic information of a single animal.
        /// </summary>
        /// <param name="id">The unique identifier for the animal.</param>
        /// <returns>The basic information for the requested animal.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Animal), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            Logger.LogInformation($"Requesting the basic information for the animal with ID {id}...");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var animal = await _animalCrudService.GetOneAsync(id, RequestAbortToken)
                                                 .ConfigureAwait(false);
            return Ok(animal);
        }

        /// <summary>
        /// Requests the creation of a new animal with the supplied details.
        /// </summary>
        /// <param name="animal">The details of the animal to be created.</param>
        /// <returns>The created animal with it's unique identifier.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(Animal), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddAnimal([Required][FromBody] Animal animal)
        {
            Logger.LogInformation($"Requesting the creation of a new animal {animal}...");

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var savedAnimal = await _animalCrudService.AddAsync(animal, RequestAbortToken)
                                                      .ConfigureAwait(false);
            return CreatedAtAction("Get", new { id = savedAnimal.Id }, savedAnimal);
        }

        /// <summary>
        /// Request updates to an animal that already exists.
        /// </summary>
        /// <param name="id">The id of the animal that should be updated.</param>
        /// <param name="animal">The updates for the animal.</param>
        /// <returns>The updated animal.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Animal), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateAnimal([FromRoute] int id, [Required][FromBody] Animal animal)
        {
            Logger.LogInformation($"Requesting updates to the animal with ID {id} with body {animal}...");

            if (animal == null)
            {
                ModelState.AddModelError(nameof(animal), "animal is required.");
                return BadRequest(ModelState);
            }

            if (id != animal.Id)
            {
                ModelState.AddModelError(nameof(animal.Id), "The id in the body and in the URL do not match.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var savedAnimal = await _animalCrudService.UpdateAsync(animal, RequestAbortToken)
                                                          .ConfigureAwait(false);
                return Ok(savedAnimal);
            }
            catch (EntityNotFoundException<Animal> ex)
            {
                return NotFound(ex.Message);
            }
        }

        /// <summary>
        /// Requests a collection of animals be archived.
        /// </summary>
        /// <param name="animalIds">The identifiers of the animals to be archived.</param>
        [HttpPost("Archive")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public IActionResult ArchiveAnimals(int[] animalIds)
        {
            Logger.LogInformation("Requesting {@Count} animals to be archived...", animalIds.Length);

            if (animalIds.Length == 0)
            {
                ModelState.AddModelError(nameof(animalIds), "At least one animal identifier should be supplied.");
                return BadRequest(ModelState);
            }

            _animalCrudService.ArchiveAnimals(animalIds);

            return Ok();
        }

        /// <summary>
        /// Requests a collection of animals be unarchived.
        /// </summary>
        /// <param name="animalIds">The identifiers of the animals to be archived.</param>
        [HttpPost("Unarchive")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public IActionResult UnarchiveAnimals(int[] animalIds)
        {
            Logger.LogInformation("Requesting {@Count} animals to be unarchived...", animalIds.Length);

            if (animalIds.Length == 0)
            {
                ModelState.AddModelError(nameof(animalIds), "At least one animal identifier should be supplied.");
                return BadRequest(ModelState);
            }

            _animalCrudService.UnarchiveAnimals(animalIds);

            return Ok();
        }
    }
}
