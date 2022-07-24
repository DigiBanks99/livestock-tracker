using System.Globalization;

namespace Given.A.FeedingTransactionAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class DeletingAFeedingTransaction
{
    private readonly IntegrationTestFixture _fixture;

    public DeletingAFeedingTransaction(IntegrationTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task ItShouldDeleteTheCorrespondingTransactionWithTheGivenId()
    {
        // Arrange
        const string url = "/api/FeedingTransaction/1";
        FeedingTransactionViewModel? transaction = await _fixture.Client
            .GetFromJsonAsync<FeedingTransactionViewModel>("/api/FeedingTransaction/1/1").ConfigureAwait(false);

        // Act
        HttpResponseMessage response = await _fixture.Client.DeleteAsync(url).ConfigureAwait(false);

        // Assert
        response.EnsureSuccessStatusCode();
        _fixture.DatabaseConnection.Open();
        await using SqliteCommand command = new(@"
SELECT COUNT(Id)
FROM FeedingTransactions
WHERE Id = 1", _fixture.DatabaseConnection);
        object? boxedCount = await command.ExecuteScalarAsync(CancellationToken.None).ConfigureAwait(false);
        boxedCount.ShouldNotBeNull()
            .ShouldBeAssignableTo<long>()
            .ShouldBe(0);

        string query = $@"
INSERT INTO FeedingTransactions (Id, AnimalId, TransactionDate, Quantity, UnitId, FeedTypeID)
VALUES (
 {transaction!.Id}
,{transaction.AnimalId}
,{transaction.TransactionDate.Ticks}
,{transaction.Quantity.ToString(CultureInfo.InvariantCulture)}
,{transaction.UnitId}
,{transaction.FeedTypeId}
)";
        await using SqliteCommand addCmd = new(query, _fixture.DatabaseConnection);

        await addCmd.ExecuteNonQueryAsync(CancellationToken.None).ConfigureAwait(false);

        _fixture.DatabaseConnection.Close();
    }

    [Fact]
    public async void ItShouldReturnANotFoundResultIfATransactionWithTheGivenIdDoesNotExist()
    {
        // Arrange
        const string url = "/api/FeedingTransaction/-1";

        // Act
        HttpResponseMessage response = await _fixture.Client.DeleteAsync(url).ConfigureAwait(false);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.NotFound);
    }
}
