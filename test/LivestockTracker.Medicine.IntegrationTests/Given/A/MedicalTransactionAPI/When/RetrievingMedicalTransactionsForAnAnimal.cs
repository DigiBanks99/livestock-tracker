using LivestockTracker.Logic.Paging;
using Shouldly;
using System.Net.Http.Json;

namespace IntegrationTests.Given.A.MedicalTransactionAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class RetrievingMedicalTransactionsForAnAnimal
{
    private readonly HttpClient _client;

    public RetrievingMedicalTransactionsForAnAnimal(IntegrationTestFixture fixture)
    {
        _client = fixture.Client;
    }

    [Fact]
    public async Task ItShouldOnlyReturnMedicalTransactionsForTheGivenAnimal()
    {
        // Arrange
        int animalId = 1;
        int transactionId = 1;

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
}
