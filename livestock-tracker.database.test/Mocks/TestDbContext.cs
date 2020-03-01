using LivestockTracker.Database.Test.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace LivestockTracker.Database.Test.Mocks
{
  public class TestDbContext : DbContext
  {
    public TestDbContext()
    {
      Invocations = new Dictionary<string, Invocation>();
    }

    public TestDbContext(DbContextOptions<TestDbContext> options) : base(options)
    {
      Invocations = new Dictionary<string, Invocation>();
    }

    public Dictionary<string, Invocation> Invocations { get; }
    public DbSet<TestEntity> TestEntities
    {
      get
      {
        if (!Invocations.TryGetValue(nameof(TestEntities), out var invocation))
        {
          Invocations.Add(nameof(TestEntities), new Invocation
          {
            MethodName = nameof(TestEntities),
            Arguments = new object[0],
            Count = 1
          });
        }
        else
        {
          invocation.Count++;
        }

        return base.Set<TestEntity>();
      }
    }
  }
}
