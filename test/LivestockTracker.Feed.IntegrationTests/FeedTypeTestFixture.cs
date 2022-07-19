namespace Given;

public class FeedTypeTestFixture : IntegrationTestFixture
{
}

[CollectionDefinition(IntegrationTestFixture.CollectionName)]
public class LivestockTestCollection : ICollectionFixture<FeedTypeTestFixture>
{
}
