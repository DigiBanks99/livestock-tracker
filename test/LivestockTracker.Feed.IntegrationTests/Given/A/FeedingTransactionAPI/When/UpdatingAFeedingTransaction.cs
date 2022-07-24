using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NuGet.Protocol;

namespace Given.A.FeedingTransactionAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class UpdatingAFeedingTransaction
{
    private readonly IntegrationTestFixture _fixture;

    public UpdatingAFeedingTransaction(IntegrationTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task ItShouldSaveTheMedicalTransactionWithTheUpdatedValues()
    {
        // Arrange
        UpdateFeedingTransactionViewModel updateRequest = new(1, 1, 2, 77, 2, DateTimeOffset.Now);
        string url = $"/api/FeedingTransaction/{updateRequest.Id}";
        FeedingTransactionViewModel savedTransaction =
            GetFeedingTransactionFromConnection(updateRequest.Id, _fixture.DatabaseConnection);

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, updateRequest);

        // Assert
        response.EnsureSuccessStatusCode();
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        FeedingTransactionViewModel? updatedTransaction =
            await response.Content.ReadFromJsonAsync<FeedingTransactionViewModel>();
        updatedTransaction.ShouldNotBeNull();

        updatedTransaction.Id.ShouldBe(savedTransaction.Id);
        updatedTransaction.AnimalId.ShouldBe(savedTransaction.AnimalId);
        updatedTransaction.Quantity.ShouldBe(updateRequest.Quantity);
        updatedTransaction.FeedTypeId.ShouldBe(updateRequest.FeedTypeId);
        updatedTransaction.TransactionDate.ShouldBe(updateRequest.TransactionDate);
        updatedTransaction.UnitId.ShouldBe(updateRequest.UnitId);

        // Clean-up
        await _fixture.Client.PutAsJsonAsync(url, savedTransaction);
    }

    [Fact]
    public async Task ItShouldReturnBadRequestWhenAttemptingToChangeTheAnimal()
    {
        // Arrange
        UpdateFeedingTransactionViewModel updateRequest = new(1, 2, 2, 77, 2, DateTimeOffset.Now);
        ;
        string url = $"/api/FeedingTransaction/{updateRequest.Id}";

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, updateRequest);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
        string content = await response.Content.ReadAsStringAsync();
        Dictionary<string, string[]>? keyValues = JsonConvert.DeserializeObject<Dictionary<string, string[]>>(content);
        keyValues.ShouldNotBeNull();
        keyValues["AnimalId"][0]
            .ShouldBe(
                "A transaction cannot be moved to a different animal. Capture a new transaction for that animal and delete this one.");
    }

    [Fact]
    public async Task ItShouldReturnBadRequestWhenTheRouteAndBodyIdsDoNotMatch()
    {
        // Arrange
        UpdateFeedingTransactionViewModel updateRequest = new(2, 2, 2, 77, 2, DateTimeOffset.Now);
        ;
        const string url = "/api/FeedingTransaction/1";

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, updateRequest);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
        string content = await response.Content.ReadAsStringAsync();
        Dictionary<string, string[]>? keyValues = JsonConvert.DeserializeObject<Dictionary<string, string[]>>(content);
        keyValues.ShouldNotBeNull();
        keyValues["id"][0].ShouldBe("The id in the transaction body does match the id in the route.");
    }

    [Fact]
    public async Task ItShouldReturnBadRequestWhenTheBodyIsNull()
    {
        // Arrange
        const string url = "/api/FeedingTransaction/1";
        UpdateFeedingTransactionViewModel? updateRequest = null;

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, updateRequest);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
        string content = await response.Content.ReadAsStringAsync();

        // It returns a problem descriptor. Need to try and see how I will handle that
        SerializableError? error = JsonConvert.DeserializeObject<SerializableError>(content);
        error.ShouldNotBeNull();
        string? message = error["errors"].ToJToken()["request"]?.Value<string>(0);
        message.ShouldBe("The request field is required.");
    }

    private static FeedingTransactionViewModel GetFeedingTransactionFromConnection(long id,
        SqliteConnection databaseConnection)
    {
        using SqliteCommand cmd = new(@$"
SELECT
  ID
 ,AnimalID
 ,FeedTypeID
 ,Quantity
 ,UnitID
 ,TransactionDate
FROM FeedingTransactions WHERE ID = {id}", databaseConnection);

        try
        {
            databaseConnection.Open();
            using SqliteDataReader dataReader = cmd.ExecuteReader();
            FeedingTransactionViewModel? transaction = null;
            while (dataReader.Read())
            {
                transaction = new FeedingTransactionViewModel(
                    dataReader.GetFieldValue<long>(0),
                    dataReader.GetFieldValue<long>(1),
                    dataReader.GetFieldValue<int>(2),
                    dataReader.GetFieldValue<decimal>(3),
                    dataReader.GetFieldValue<int>(4),
                    dataReader.GetDateTimeOffsetFromOrdinal(5)
                );
            }

            return transaction ??
                   throw new InvalidOperationException($"Could not find seeded feeding transaction with Id: {id}");
        }
        finally
        {
            databaseConnection.Close();
        }
    }
}
