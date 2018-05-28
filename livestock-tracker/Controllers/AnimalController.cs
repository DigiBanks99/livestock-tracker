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

        [HttpGet]
        public IActionResult Get(int id)
        {
            return Ok(_animalService.Get(id));
        }

        [HttpPost]
        public IActionResult AddAnimal([FromBody]Animal animal)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            _animalService.Add(animal);
            _animalService.Save();
            return CreatedAtAction("Get", new { id = animal.ID}, animal);
        }

        [HttpPut]
        public IActionResult UpdateAnimal([FromBody]Animal animal)
        {
            try
            {
                _animalService.Update(animal);
                _animalService.Save();
                return Ok();
            }
            catch (AnimalNotFoundException ex)
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
