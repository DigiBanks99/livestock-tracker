namespace Given.A.FeedingTransactionAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class CreatingAFeedingTransaction
{
    private readonly IntegrationTestFixture _fixture;

    public CreatingAFeedingTransaction(IntegrationTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task ThenItShouldReturnTheLinkToTheCreatedTransactionWithTheTransactionDetails()
    {
        // Arrange
        CreateFeedingTransactionViewModel request = new(1, 2, 86, 1, DateTimeOffset.Now);

        // Act
        HttpResponseMessage response = await _fixture.Client.PostAsJsonAsync("/api/FeedingTransaction", request);

        // Assert
        response.EnsureSuccessStatusCode();
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        FeedingTransactionViewModel? createdTransaction =
            await response.Content.ReadFromJsonAsync<FeedingTransactionViewModel>();
        createdTransaction.ShouldNotBeNull();
        response.Headers.Location.ShouldNotBeNull();
        Uri expectedUri =
            new($"http://localhost/api/FeedingTransaction/{createdTransaction.AnimalId}/{createdTransaction.Id}");
        response.Headers.Location.ShouldBe(expectedUri);

        createdTransaction.AnimalId.ShouldBe(createdTransaction.AnimalId);
        createdTransaction.Quantity.ShouldBe(createdTransaction.Quantity);
        createdTransaction.FeedTypeId.ShouldBe(createdTransaction.FeedTypeId);
        createdTransaction.TransactionDate.ShouldBe(createdTransaction.TransactionDate);
        createdTransaction.UnitId.ShouldBe(createdTransaction.UnitId);
        createdTransaction.Id.ShouldBeGreaterThan(45);

        _fixture.DatabaseConnection.Open();
        await using SqliteCommand cmd = new($"DELETE FROM FeedingTransactions WHERE ID = {createdTransaction.Id}",
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
