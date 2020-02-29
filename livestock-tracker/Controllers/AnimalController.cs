using LivestockTracker.Models;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Controllers
{
  [Route("api/[controller]")]
  public class AnimalController : Controller
  {
    private readonly IAnimalService _animalService;
    public AnimalController(IAnimalService service)
    {
      _animalService = service;
    }

    public CancellationToken RequestAbortToken { get { return Request.HttpContext.RequestAborted; } }

    [HttpGet]
    public async Task<IActionResult> GetAnimals()
    {
      var animals = await _animalService.GetAllAsync(RequestAbortToken).ConfigureAwait(false);
      return Ok(animals);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get([FromRoute] int id)
    {
      var animal = await _animalService.GetAsync(id, RequestAbortToken).ConfigureAwait(false);
      return Ok(animal);
    }

    [HttpPost]
    public IActionResult AddAnimal([FromBody]Animal animal)
    {
      if (!ModelState.IsValid)
        return BadRequest();

      var savedAnimal = _animalService.Add(animal);
      _animalService.Save();
      return CreatedAtAction("Get", new { id = savedAnimal.ID }, savedAnimal);
    }

    [HttpPatch("{id}")]
    public IActionResult UpdateAnimal([FromRoute] int id, [FromBody]Animal animal)
    {
      try
      {
        if (id != animal.ID)
          return BadRequest();

        _animalService.Update(animal);
        _animalService.Save();
        var savedAnimal = _animalService.Get(animal.ID);
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
      _animalService.Save();
      return Ok(id);
    }
  }
}
