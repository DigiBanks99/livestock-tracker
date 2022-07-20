namespace Given.A.MedicalTransactionAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class CreatingAMedicalTransaction
{
    private readonly IntegrationTestFixture _fixture;

    public CreatingAMedicalTransaction(IntegrationTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task ThenItShouldReturnTheLinkToTheCreatedTransactionWithTheTransactionDetails()
    {
        // Arrange
        MedicalTransaction request = new()
        {
            AnimalId = 1,
            Dose = 86,
            MedicineId = 2,
            TransactionDate = DateTimeOffset.Now,
            UnitId = 1
        };

        // Act
        HttpResponseMessage response = await _fixture.Client.PostAsJsonAsync("/api/MedicalTransactions", request);

        // Assert
        response.EnsureSuccessStatusCode();
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        MedicalTransaction? createdTransaction = await response.Content.ReadFromJsonAsync<MedicalTransaction>();
        createdTransaction.ShouldNotBeNull();
        response.Headers.Location.ShouldNotBeNull();
        Uri expectedUri =
            new($"http://localhost/api/MedicalTransactions/{createdTransaction.AnimalId}/{createdTransaction.Id}");
        response.Headers.Location.ShouldBe(expectedUri);

        createdTransaction.AnimalId.ShouldBe(createdTransaction.AnimalId);
        createdTransaction.Dose.ShouldBe(createdTransaction.Dose);
        createdTransaction.MedicineId.ShouldBe(createdTransaction.MedicineId);
        createdTransaction.TransactionDate.ShouldBe(createdTransaction.TransactionDate);
        createdTransaction.UnitId.ShouldBe(createdTransaction.UnitId);
        createdTransaction.Id.ShouldBeGreaterThan(45);

        _fixture.DatabaseConnection.Open();
        using SqliteCommand cmd = new($"DELETE FROM MedicalTransactions WHERE ID = {createdTransaction.Id}",
            _fixture.DatabaseConnection);
        try
        {
            cmd.ExecuteNonQuery();
        }
        finally
        {
            _fixture.DatabaseConnection.Close();
        }
    }

    [Fact]
    public async Task ThenItShouldReturnBadRequestIfTheTransactionWithTheSameIdExists()
    {
        // Arrange
        MedicalTransaction request = new()
        {
            Id = 1,
            AnimalId = 1,
            Dose = 86,
            MedicineId = 2,
            TransactionDate = DateTimeOffset.Now,
            UnitId = 1
        };

        // Act
        HttpResponseMessage response = await _fixture.Client.PostAsJsonAsync("/api/MedicalTransactions", request);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        string responseMessage = await response.Content.ReadAsStringAsync();
        responseMessage.ShouldBe("\"A Medical Transaction with key 1 already exists.\"");

        _fixture.DatabaseConnection.Open();
        await using SqliteCommand cmd = new("SELECT COUNT(ID) FROM MedicalTransactions", _fixture.DatabaseConnection);
        try
        {
            object? count = cmd.ExecuteScalar();
            count.ShouldBe(45);
        }
        finally
        {
            _fixture.DatabaseConnection.Close();
        }
    }
}
