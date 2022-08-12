using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Pagination;
using LivestockTracker.Animals.ViewModels;
using LivestockTracker.Controllers;
using LivestockTracker.Exceptions;
using LivestockTracker.Pagination;

namespace LivestockTracker.Animals;

/// <summary>
///     Provides a set of endpoints for interacting with animal information.
/// </summary>
public class AnimalController : LivestockApiController
{
    private readonly IAnimalManager _animalManager;
    private readonly IAnimalSearchService _animalSummaryService;

    /// <summary>
    ///     Constructor.
    /// </summary>
    /// <param name="logger">The logger.</param>
    /// <param name="animalManager">The service for animal CRUD operations.</param>
    /// <param name="animalSummaryService">A service for animal summary operations.</param>
    public AnimalController(ILogger<AnimalController> logger,
        IAnimalManager animalManager,
        IAnimalSearchService animalSummaryService)
        : base(logger)
    {
        _animalManager = animalManager;
        _animalSummaryService = animalSummaryService;
    }

    /// <summary>
    ///     Requests a paged list of all animals sorted by number.
    /// </summary>
    /// <param name="pagingOptions">Options relating to paging the request results.</param>
    /// <param name="orderingOptions">Options relating to ordering the request results.</param>
    /// <param name="includeArchived">Include archived animals in the results.</param>
    /// <returns>A paged list of animals.</returns>
    [HttpGet]
    [ProducesResponseType(typeof(IPagedData<AnimalSummary>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public IActionResult GetAnimals([FromQuery] PagingOptions pagingOptions,
        [FromQuery] OrderingOptions<AnimalOrderType> orderingOptions,
        bool? includeArchived = false)
    {
        Logger.LogInformation("Requesting {PageSize} animals from page {PageNumber}...",
            pagingOptions.PageSize,
            pagingOptions.PageNumber);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        AnimalSummaryFilter filter = new(includeArchived);

        IPagedData<AnimalSummary> animals = _animalSummaryService.SearchPaged(filter, pagingOptions, orderingOptions);
        return Ok(animals);
    }

    /// <summary>
    ///     Requests the basic information of a single animal.
    /// </summary>
    /// <param name="id">The unique identifier for the animal.</param>
    /// <returns>The basic information for the requested animal.</returns>
    [HttpGet("{id:long}")]
    [ProducesResponseType(typeof(AnimalViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Get([FromRoute] long id)
    {
        Logger.LogInformation("Requesting the basic information for the animal with ID {AnimalId}...", id);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        Animal? animal = await _animalManager.GetOneAsync(id, RequestAbortToken)
            .ConfigureAwait(false);
        return animal == null
            ? NotFound()
            : Ok(animal.ToViewModel());
    }

    /// <summary>
    ///     Requests the creation of a new animal with the supplied details.
    /// </summary>
    /// <param name="animal">The details of the animal to be created.</param>
    /// <returns>The created animal with it's unique identifier.</returns>
    [HttpPost]
    [ProducesResponseType(typeof(AnimalViewModel), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddAnimal([Required] [FromBody] CreateAnimalViewModel animal)
    {
        Logger.LogInformation("Requesting the creation of a new animal {@Animal}...", animal);

        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        Animal savedAnimal = await _animalManager.AddAsync(animal.ToAnimal(), RequestAbortToken)
            .ConfigureAwait(false);
        return CreatedAtAction(nameof(Get), new { id = savedAnimal.Id }, savedAnimal.ToViewModel());
    }

    /// <summary>
    ///     Request updates to an animal that already exists.
    /// </summary>
    /// <param name="id">The id of the animal that should be updated.</param>
    /// <param name="animal">The updates for the animal.</param>
    /// <returns>The updated animal.</returns>
    [HttpPut("{id:long}")]
    [ProducesResponseType(typeof(AnimalViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateAnimal([FromRoute] long id,
        [Required] [FromBody] UpdateAnimalViewModel animal)
    {
        Logger.LogInformation("Requesting updates to the animal with ID {AnimalId} with body {@Animal}...", id, animal);

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
            Animal savedAnimal = await _animalManager.UpdateAsync(id, animal.ToAnimal(), RequestAbortToken)
                .ConfigureAwait(false);
            return Ok(savedAnimal.ToViewModel());
        }
        catch (EntityNotFoundException<Animal> ex)
        {
            return NotFound(ex.Message);
        }
    }

    /// <summary>
    ///     Requests a collection of animals be archived.
    /// </summary>
    /// <param name="animalIds">The identifiers of the animals to be archived.</param>
    [HttpPost("Archive")]
    [ProducesResponseType(StatusCodes.Status202Accepted)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public IActionResult ArchiveAnimals(int[] animalIds)
    {
        Logger.LogInformation("Requesting {Count} animals to be archived...", animalIds.Length);

        if (animalIds.Length == 0)
        {
            ModelState.AddModelError(nameof(animalIds), "At least one animal identifier should be supplied.");
            return BadRequest(ModelState);
        }

        _animalManager.ArchiveAnimals(animalIds);

        return Ok();
    }

    /// <summary>
    ///     Requests a collection of animals be unarchived.
    /// </summary>
    /// <param name="animalIds">The identifiers of the animals to be archived.</param>
    [HttpPost("Unarchive")]
    [ProducesResponseType(StatusCodes.Status202Accepted)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public IActionResult UnarchiveAnimals(int[] animalIds)
    {
        Logger.LogInformation("Requesting {Count} animals to be unarchived...", animalIds.Length);

        if (animalIds.Length == 0)
        {
            ModelState.AddModelError(nameof(animalIds), "At least one animal identifier should be supplied.");
            return BadRequest(ModelState);
        }

        _animalManager.UnarchiveAnimals(animalIds);

        return Ok();
    }

    /// <summary>
    ///     Requests the recording of a sale of an animal.
    /// </summary>
    /// <param name="sellRequest">The details of the sale.</param>
    /// <returns>An HTTP response.</returns>
    [HttpPut("Sell")]
    [ProducesResponseType(StatusCodes.Status202Accepted)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> SellAnimalAsync(SellAnimalRequestViewModel sellRequest)
    {
        Logger.LogInformation("Requesting the sale of animal with ID {AnimalID}", sellRequest.AnimalId);

        await _animalManager.SellAnimalAsync(sellRequest.AnimalId, sellRequest.SellDate, sellRequest.SellPrice,
                RequestAbortToken)
            .ConfigureAwait(false);

        return Ok();
    }

    /// <summary>
    ///     Requests the recording of a sale of an animal.
    /// </summary>
    /// <param name="recordDeathRequest">The details of the sale.</param>
    /// <returns>An HTTP response.</returns>
    [HttpPut("Death")]
    [ProducesResponseType(StatusCodes.Status202Accepted)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RecordAnimalDeathAsync(RecordAnimalDeathViewModel recordDeathRequest)
    {
        Logger.LogInformation("Requesting the recording of the death of animal with ID {AnimalID}",
            recordDeathRequest.AnimalId);

        await _animalManager.RecordAnimalDeathAsync(recordDeathRequest.AnimalId, recordDeathRequest.DateOfDeath,
                RequestAbortToken)
            .ConfigureAwait(false);

        return Ok();
    }
}
