using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models.Animals;
using LivestockTracker.Database.Models.Animals;
using LivestockTracker.Database.Test.Mocks;
using LivestockTracker.Logic.Services.Animals;
using LivestockTracker.Models.Animals;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace LivestockTracker.Database.Test.Given.An.AnimalService.When
{
    public class AddingAnAnimal
    {
        private readonly ITestOutputHelper _testOutputHelper;
        private readonly Mock<IMapper<AnimalModel, IAnimal>> _mockMapper;

        public AddingAnAnimal(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
            _mockMapper = new Mock<IMapper<AnimalModel, IAnimal>>();
            _mockMapper.Setup(mapper => mapper.Map(It.IsAny<AnimalModel?>()))
                       .Returns((AnimalModel? animal) => animal == null ? new Animal() : new Animal
                       {
                           Id = animal.Id,
                           ArrivalWeight = animal.ArrivalWeight,
                           BatchNumber = animal.BatchNumber,
                           BirthDate = animal.BirthDate,
                           DateOfDeath = animal.DateOfDeath,
                           Deceased = animal.Deceased,
                           Number = animal.Number,
                           PurchaseDate = animal.PurchaseDate,
                           PurchasePrice = animal.PurchasePrice,
                           SellDate = animal.SellDate,
                           SellPrice = animal.SellPrice,
                           Sold = animal.Sold,
                           Subspecies = animal.Subspecies,
                           Type = animal.Type
                       });

            _mockMapper.Setup(mapper => mapper.Map(It.IsAny<IAnimal?>()))
                       .Returns((IAnimal? animal) => animal == null ? new AnimalModel() : new AnimalModel
                       {
                           Id = animal.Id,
                           ArrivalWeight = animal.ArrivalWeight,
                           BatchNumber = animal.BatchNumber,
                           BirthDate = animal.BirthDate,
                           DateOfDeath = animal.DateOfDeath,
                           Deceased = animal.Deceased,
                           Number = animal.Number,
                           PurchaseDate = animal.PurchaseDate,
                           PurchasePrice = animal.PurchasePrice,
                           SellDate = animal.SellDate,
                           SellPrice = animal.SellPrice,
                           Sold = animal.Sold,
                           Subspecies = animal.Subspecies,
                           Type = animal.Type
                       });
        }

        [Fact]
        public async Task ThatDoesNotExistItShouldAddItToTheDatabase()
        {
            var context = TestDbContextFactory.Create();
            var service = new AnimalCrudService(NullLogger<AnimalCrudService>.Instance, context, _mockMapper.Object);
            var animal = new Animal();

            await service.AddAsync(animal, CancellationToken.None);

            Assert.Equal(1, context.Animals.Count());
        }
    }
}
