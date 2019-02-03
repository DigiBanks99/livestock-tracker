using LivestockTracker.Models;
using LivestockTracker.Services;
using Microsoft.AspNetCore.Mvc;

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

    [HttpGet]
    public IActionResult GetAnimals()
    {
      return Ok(_animalService.GetAll());
    }

    [HttpGet("{id}")]
    public IActionResult Get([FromRoute] int id)
    {
      return Ok(_animalService.Get(id));
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

    [HttpPatch]
    public IActionResult UpdateAnimal([FromBody]Animal animal)
    {
      try
      {
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
      return Ok();
    }
  }
}
