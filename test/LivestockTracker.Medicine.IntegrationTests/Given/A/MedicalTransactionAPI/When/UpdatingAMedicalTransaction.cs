using LivestockTracker.Medicine.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NuGet.Protocol;

namespace Given.A.MedicalTransactionAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class UpdatingAMedicalTransaction
{
    private readonly IntegrationTestFixture _fixture;

    public UpdatingAMedicalTransaction(IntegrationTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task ItShouldSaveTheMedicalTransactionWithTheUpdatedValues()
    {
        // Arrange
        UpdateMedicalTransactionViewModel updateRequest = new(1, 1, 2, 77, 2, DateTimeOffset.Now);
        string url = $"/api/MedicalTransactions/{updateRequest.Id}";
        MedicalTransactionViewModel savedTransaction =
            GetMedicalTransactionFromConnection(updateRequest.Id, _fixture.DatabaseConnection);

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, updateRequest);

        // Assert
        response.EnsureSuccessStatusCode();
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        MedicalTransactionViewModel? updatedTransaction =
            await response.Content.ReadFromJsonAsync<MedicalTransactionViewModel>();
        updatedTransaction.ShouldNotBeNull();

        updatedTransaction.Id.ShouldBe(savedTransaction.Id);
        updatedTransaction.AnimalId.ShouldBe(savedTransaction.AnimalId);
        updatedTransaction.Dose.ShouldBe(updateRequest.Dose);
        updatedTransaction.MedicineId.ShouldBe(updateRequest.MedicineId);
        updatedTransaction.TransactionDate.ShouldBe(updateRequest.TransactionDate);
        updatedTransaction.UnitId.ShouldBe(updateRequest.UnitId);

        // Clean-up
        await _fixture.Client.PutAsJsonAsync(url, savedTransaction);
    }

    [Fact]
    public async Task ItShouldReturnBadRequestWhenAttemptingToChangeTheAnimal()
    {
        // Arrange
        UpdateMedicalTransactionViewModel updateRequest = new(1, 2, 2, 77, 2, DateTimeOffset.Now);
        string url = $"/api/MedicalTransactions/{updateRequest.Id}";

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
        UpdateMedicalTransactionViewModel updateRequest = new(2, 2, 2, 77, 2, DateTimeOffset.Now);
        const string url = "/api/MedicalTransactions/1";

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
        const string url = "/api/MedicalTransactions/1";
        UpdateMedicalTransactionViewModel? updateRequest = null;

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, updateRequest);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
        string content = await response.Content.ReadAsStringAsync();

        // It returns a problem descriptor. Need to try and see how I will handle that
        SerializableError? error = JsonConvert.DeserializeObject<SerializableError>(content);
        error.ShouldNotBeNull();
        string? message = error["errors"].ToJToken()["desiredValues"]?.Value<string>(0);
        message.ShouldBe("The desiredValues field is required.");
    }

    private static MedicalTransactionViewModel GetMedicalTransactionFromConnection(long id,
        SqliteConnection databaseConnection)
    {
        using SqliteCommand cmd = new(@$"
SELECT
  ID
 ,AnimalID
 ,MedicineID
 ,TransactionDate
 ,Dose
 ,UnitID
FROM MedicalTransactions WHERE ID = {id}", databaseConnection);
        databaseConnection.Open();
        MedicalTransactionViewModel transaction = MedicalTransactionViewModel.Null;

        using SqliteDataReader dataReader = cmd.ExecuteReader();

        while (dataReader.Read())
        {
            transaction = new(dataReader.GetFieldValue<long>(0),
                dataReader.GetFieldValue<long>(1),
                dataReader.GetFieldValue<int>(2),
                dataReader.GetDateTimeOffsetFromOrdinal(3),
                dataReader.GetFieldValue<decimal>(4),
                dataReader.GetFieldValue<int>(5));
        }

        databaseConnection.Close();

        return transaction;
    }
}
