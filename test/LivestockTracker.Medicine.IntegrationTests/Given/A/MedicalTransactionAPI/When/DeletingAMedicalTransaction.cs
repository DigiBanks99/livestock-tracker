using System.Globalization;
using System.Text;

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
        MedicalTransaction? transaction = await _fixture.Client.GetFromJsonAsync<MedicalTransaction>("/api/MedicalTransactions/1/1").ConfigureAwait(false);

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

        const char comma = ',';
        StringBuilder addQueryBuilder = new();
        addQueryBuilder.AppendLine("INSERT INTO MedicalTransactions (Id, AnimalId, TransactionDate, Dose, UnitId, MedicineId)");
        addQueryBuilder.AppendLine("VALUES (");
        addQueryBuilder.Append(transaction!.Id);
        addQueryBuilder.Append(comma);
        addQueryBuilder.Append(transaction.AnimalId);
        addQueryBuilder.Append(comma);
        addQueryBuilder.Append(transaction.TransactionDate.Ticks);
        addQueryBuilder.Append(comma);
        addQueryBuilder.Append(transaction.Dose.ToString(CultureInfo.InvariantCulture));
        addQueryBuilder.Append(comma);
        addQueryBuilder.Append(transaction.UnitId);
        addQueryBuilder.Append(comma);
        addQueryBuilder.Append(transaction.MedicineId);
        addQueryBuilder.Append(')');
        await using SqliteCommand addCmd = new(addQueryBuilder.ToString(), _fixture.DatabaseConnection);

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
