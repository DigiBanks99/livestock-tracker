using LivestockTracker.Database.Test.Resources;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace LivestockTracker.Database.Test.Mocks
{
  public static class TestDbContextFactory
  {
    public static TestDbContext Create()
    {
      var serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .BuildServiceProvider();

      var contextBuilder = new DbContextOptionsBuilder<TestDbContext>()
        .UseInMemoryDatabase(databaseName: "TestData")
        .UseInternalServiceProvider(serviceProvider);

      var mockContext = new TestDbContext(contextBuilder.Options);
      mockContext.AddRange(TestDataService.TestEntities);
      mockContext.SaveChanges();
      return mockContext;
    }
  }
}
