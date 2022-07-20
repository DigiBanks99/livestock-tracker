namespace Given.A.MedicalTransactionAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class RetrievingMedicalTransactionsForAnAnimal
{
    private readonly HttpClient _client;

    public RetrievingMedicalTransactionsForAnAnimal(IntegrationTestFixture fixture)
    {
        _client = fixture.Client;
    }

    [Theory]
    [InlineData(1, 1)]
    [InlineData(1, 8)]
    [InlineData(3, (15 * 3) - 3)]
    public async Task ItShouldOnlyReturnMedicalTransactionsForTheGivenAnimal(int animalId, int transactionId)
    {
        // Act
        HttpResponseMessage response = await _client.GetAsync($"/api/MedicalTransactions/{animalId}/{transactionId}");

        // Assert
        response.EnsureSuccessStatusCode();
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        MedicalTransaction? transaction = await response.Content.ReadFromJsonAsync<MedicalTransaction>();
        transaction.ShouldNotBeNull();
        transaction.AnimalId.ShouldBe(animalId);
        transaction.Id.ShouldBe(transactionId);
    }

    [Fact]
    public async Task AndTheTransactionDoesNotExistThenItShouldReturnNotFound()
    {
        // Act
        HttpResponseMessage response = await _client.GetAsync("/api/MedicalTransactions/1/9999999");

        // Assert
        response.StatusCode.ShouldBe((HttpStatusCode)StatusCodes.Status404NotFound);
    }
}
