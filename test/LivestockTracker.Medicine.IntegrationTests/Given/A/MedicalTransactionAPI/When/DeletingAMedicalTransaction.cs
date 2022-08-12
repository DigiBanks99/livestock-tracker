using System.Globalization;
using LivestockTracker.Medicine.ViewModels;

namespace Given.A.MedicalTransactionAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class DeletingAMedicalTransaction
{
    private readonly IntegrationTestFixture _fixture;

    public DeletingAMedicalTransaction(IntegrationTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task ItShouldDeleteTheCorrespondingTransactionWithTheGivenId()
    {
        // Arrange
        const string url = "/api/MedicalTransactions/1";
        MedicalTransactionViewModel? transaction = await _fixture.Client
            .GetFromJsonAsync<MedicalTransactionViewModel>("/api/MedicalTransactions/1/1").ConfigureAwait(false);

        // Act
        HttpResponseMessage response = await _fixture.Client.DeleteAsync(url).ConfigureAwait(false);

        // Assert
        response.EnsureSuccessStatusCode();
        _fixture.DatabaseConnection.Open();
        await using SqliteCommand command = new(@"
SELECT COUNT(Id)
FROM MedicalTransactions
WHERE Id = 1", _fixture.DatabaseConnection);
        object? boxedCount = await command.ExecuteScalarAsync(CancellationToken.None).ConfigureAwait(false);
        boxedCount.ShouldNotBeNull()
            .ShouldBeAssignableTo<long>()
            .ShouldBe(0);

        string query = $@"
INSERT INTO MedicalTransactions (Id, AnimalId, TransactionDate, Dose, UnitId, MedicineId)
VALUES (
 {transaction!.Id}
,{transaction.AnimalId}
,{transaction.TransactionDate.Ticks}
,{transaction.Dose.ToString(CultureInfo.InvariantCulture)}
,{transaction.UnitId}
,{transaction.MedicineId}
)";
        await using SqliteCommand addCmd = new(query, _fixture.DatabaseConnection);

        await addCmd.ExecuteNonQueryAsync(CancellationToken.None).ConfigureAwait(false);

        _fixture.DatabaseConnection.Close();
    }

    [Fact]
    public async void ItShouldReturnANotFoundResultIfATransactionWithTheGivenIdDoesNotExist()
    {
        // Arrange
        const string url = "/api/MedicalTransactions/-1";

        // Act
        HttpResponseMessage response = await _fixture.Client.DeleteAsync(url).ConfigureAwait(false);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.NotFound);
    }
}
