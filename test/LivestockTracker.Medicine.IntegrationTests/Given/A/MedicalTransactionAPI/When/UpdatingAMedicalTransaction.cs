using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NuGet.Protocol;

namespace Given.A.MedicalTransactionAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class UpdatingAMedicalTransaction
{
    private readonly MedicineTestFixture _fixture;

    public UpdatingAMedicalTransaction(MedicineTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task ItShouldSaveTheMedicalTransactionWithTheUpdatedValues()
    {
        // Arrange
        MedicalTransaction updateRequest = new()
        {
            Id = 1,
            AnimalId = 1,
            Dose = 77,
            MedicineId = 2,
            TransactionDate = new DateTimeOffset(),
            UnitId = 2
        };
        string url = $"/api/MedicalTransactions/{updateRequest.Id}";
        MedicalTransaction savedTransaction = GetMedicalTransactionFromConnection(updateRequest.Id, _fixture.DatabaseConnection);

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, updateRequest);

        // Assert
        response.EnsureSuccessStatusCode();
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        MedicalTransaction? updatedTransaction = await response.Content.ReadFromJsonAsync<MedicalTransaction>();
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
        MedicalTransaction updateRequest = new()
        {
            Id = 1,
            AnimalId = 2,
            Dose = 77,
            MedicineId = 2,
            TransactionDate = new DateTimeOffset(),
            UnitId = 2
        };
        string url = $"/api/MedicalTransactions/{updateRequest.Id}";

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, updateRequest);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
        string content = await response.Content.ReadAsStringAsync();
        Dictionary<string, string[]>? keyValues = JsonConvert.DeserializeObject<Dictionary<string, string[]>>(content);
        keyValues.ShouldNotBeNull();
        keyValues["AnimalId"][0].ShouldBe("A transaction cannot be moved to a different animal. Capture a new transaction for that animal and delete this one.");
    }

    [Fact]
    public async Task ItShouldReturnBadRequestWhenTheRouteAndBodyIdsDoNotMatch()
    {
        // Arrange
        MedicalTransaction updateRequest = new()
        {
            Id = 2,
            AnimalId = 2,
            Dose = 77,
            MedicineId = 2,
            TransactionDate = new DateTimeOffset(),
            UnitId = 2
        };
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
        MedicalTransaction? updateRequest = null;

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, updateRequest);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
        string content = await response.Content.ReadAsStringAsync();

        // It returns a problem descriptor. Need to try and see how I will handle that
        SerializableError? error = JsonConvert.DeserializeObject<SerializableError>(content);
        error.ShouldNotBeNull();
        string? message = error["errors"].ToJToken()["medicalTransaction"]?.Value<string>(0);
        message.ShouldBe("The medicalTransaction field is required.");
    }

    private static MedicalTransaction GetMedicalTransactionFromConnection(long id, SqliteConnection databaseConnection)
    {
        using SqliteCommand cmd = new(@$"
SELECT
  ID
 ,AnimalID
 ,Dose
 ,MedicineID
 ,TransactionDate
 ,UnitID
FROM MedicalTransactions WHERE ID = {id}", databaseConnection);
        databaseConnection.Open();
        MedicalTransaction transaction = new();

        using SqliteDataReader dataReader = cmd.ExecuteReader();

        while (dataReader.Read())
        {
            transaction.Id = dataReader.GetFieldValue<long>(0);
            transaction.AnimalId = dataReader.GetFieldValue<long>(1);
            transaction.Dose = dataReader.GetFieldValue<decimal>(2);
            transaction.MedicineId = dataReader.GetFieldValue<int>(3);
            transaction.TransactionDate = dataReader.GetDateTimeOffsetFromOrdinal(4);
            transaction.UnitId = dataReader.GetFieldValue<int>(5);
        }

        databaseConnection.Close();

        return transaction;
    }
}
