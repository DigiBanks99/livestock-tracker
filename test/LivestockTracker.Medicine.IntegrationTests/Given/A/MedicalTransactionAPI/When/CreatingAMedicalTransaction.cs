using LivestockTracker.Medicine.ViewModels;

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
        CreateMedicalTransactionViewModel request = new(1, 2, DateTimeOffset.Now, 86, 1);

        // Act
        HttpResponseMessage response = await _fixture.Client.PostAsJsonAsync("/api/MedicalTransactions", request);

        // Assert
        response.EnsureSuccessStatusCode();
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        MedicalTransactionViewModel? createdTransaction =
            await response.Content.ReadFromJsonAsync<MedicalTransactionViewModel>();
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
        await using SqliteCommand cmd = new($"DELETE FROM MedicalTransactions WHERE ID = {createdTransaction.Id}",
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
}
