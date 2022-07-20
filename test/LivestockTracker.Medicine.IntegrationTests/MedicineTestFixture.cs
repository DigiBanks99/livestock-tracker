namespace Given;

public class MedicineTestFixture : IntegrationTestFixture
{
}

[CollectionDefinition(IntegrationTestFixture.CollectionName)]
public class LivestockTestCollection : ICollectionFixture<MedicineTestFixture>
{
}
