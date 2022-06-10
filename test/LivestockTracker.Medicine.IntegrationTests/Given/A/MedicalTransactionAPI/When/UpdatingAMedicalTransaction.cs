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
