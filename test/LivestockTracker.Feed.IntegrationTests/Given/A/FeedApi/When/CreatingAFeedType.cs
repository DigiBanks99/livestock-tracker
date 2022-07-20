namespace Given.A.FeedApi.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class CreatingAFeedType
{
    private readonly IntegrationTestFixture _fixture;

    public CreatingAFeedType(IntegrationTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task ItShouldCreateANewFeedType()
    {
        // Arrange
        FeedType feedType = new()
        {
            Description = "New Feed Type"
        };

        // Act
        HttpResponseMessage response =
            await _fixture.Client.PostAsJsonAsync("/api/FeedType", feedType).ConfigureAwait(false);

        // Assert
        response.EnsureSuccessStatusCode();
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        FeedType? createdFeedType = await response.Content.ReadFromJsonAsync<FeedType>();
        createdFeedType.ShouldNotBeNull();
        response.Headers.Location.ShouldNotBeNull();
        Uri expectedUri = new($"http://localhost/api/FeedType/{createdFeedType.Id}");
        response.Headers.Location.ShouldBe(expectedUri);

        createdFeedType.Id.ShouldBeGreaterThan(2);
        createdFeedType.Description.ShouldBe(feedType.Description);

        _fixture.DatabaseConnection.Open();
        await using SqliteCommand cmd = new($"DELETE FROM FeedTypes WHERE ID = {createdFeedType.Id}",
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
