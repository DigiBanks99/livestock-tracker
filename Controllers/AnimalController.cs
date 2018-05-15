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
            return Ok(_animalService.GetAnimals());
        }

        [HttpPost]
        public IActionResult AddAnimal([FromBody]Animal animal)
        {
            _animalService.AddAnimal(animal);
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateAnimal([FromBody]Animal animal)
        {
            try
            {
                _animalService.UpdateAnimal(animal);
                return Ok();
            }
            catch (AnimalNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}