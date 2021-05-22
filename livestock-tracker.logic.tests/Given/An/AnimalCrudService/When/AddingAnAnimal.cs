using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models.Animals;
using LivestockTracker.Database.Models.Animals;
using LivestockTracker.Logic.Services.Animals;
using LivestockTracker.Logic.Tests.Factories;
using LivestockTracker.Models.Animals;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace Given.An.AnimalService.When
{
    public class AddingAnAnimal
    {
        private readonly ILogger<AnimalCrudService> _logger;
        private readonly ILoggerFactory _loggerFactory;
        private readonly Mock<IMapper<AnimalModel, IAnimal>> _mockMapper;

        public AddingAnAnimal(ITestOutputHelper testOutputHelper)
        {
            _logger = testOutputHelper.ToLogger<AnimalCrudService>();
            _loggerFactory = testOutputHelper.ToLoggerFactory();
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
            // Arrange
            var context = LivestockDbContextFactory.Create(_loggerFactory);
            var service = new AnimalCrudService(_logger, context, _mockMapper.Object);

            // Act
            var animal = new Animal();
            await service.AddAsync(animal, CancellationToken.None);

            // Assert
            Assert.Equal(1, context.Animals.Count());
        }

        [Fact]
        public async Task ThatAlreadyExistItShouldAddItToTheDatabase()
        {
            // Arrange
            var context = LivestockDbContextFactory.Create(_loggerFactory);
            var service = new AnimalCrudService(_logger, context, _mockMapper.Object);
            var animal = new Animal
            {
                Id = 1
            };

            // Act
            await service.AddAsync(animal, CancellationToken.None);
            var exception = await Assert.ThrowsAsync<InvalidOperationException>(async () => await service.AddAsync(animal, CancellationToken.None));

            // Assert
            Assert.NotNull(exception);
            Assert.Equal(1, context.Animals.Count());
        }
    }
}
