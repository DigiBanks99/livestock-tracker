namespace Given.A.FeedingTransactionAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class RetrievingFeedingTransactionsForAnAnimal
{
    private readonly HttpClient _client;

    public RetrievingFeedingTransactionsForAnAnimal(IntegrationTestFixture fixture)
    {
        _client = fixture.Client;
    }

    [Theory]
    [InlineData(1, 1)]
    [InlineData(1, 8)]
    [InlineData(3, (15 * 3) - 3)]
    public async Task ItShouldOnlyReturnFeedingTransactionsForTheGivenAnimal(int animalId, int transactionId)
    {
        // Act
        HttpResponseMessage response = await _client.GetAsync($"/api/FeedingTransaction/{animalId}/{transactionId}");

        // Assert
        response.EnsureSuccessStatusCode();
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        FeedingTransactionViewModel? transaction =
            await response.Content.ReadFromJsonAsync<FeedingTransactionViewModel>();
        transaction.ShouldNotBeNull();
        transaction.AnimalId.ShouldBe(animalId);
        transaction.Id.ShouldBe(transactionId);
    }

    [Fact]
    public async Task AndTheTransactionDoesNotExistThenItShouldReturnNotFound()
    {
        // Act
        HttpResponseMessage response = await _client.GetAsync("/api/FeedingTransaction/1/9999999");

        // Assert
        response.StatusCode.ShouldBe((HttpStatusCode)StatusCodes.Status404NotFound);
    }
}
