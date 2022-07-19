using LivestockTracker;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;

namespace Given;

public class MedicineTestFixture : IntegrationTestFixture
{
}

[CollectionDefinition(IntegrationTestFixture.CollectionName)]
public class LivestockTestCollection : ICollectionFixture<MedicineTestFixture>
{
}
