namespace Given.A.FeedApi.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class RetrievingAFeedType
{
    private readonly IntegrationTestFixture _fixture;

    public RetrievingAFeedType(IntegrationTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task ItShouldReturnTheFeedTypeWithTheMatchingId()
    {
        // Arrange
        const string url = "/api/FeedType/1";

        // Act
        FeedTypeViewModel? feed =
            await _fixture.Client.GetFromJsonAsync<FeedTypeViewModel>(url).ConfigureAwait(false);

        // Assert
        feed.ShouldNotBeNull();
        feed.Id.ShouldBe(1);
        feed.Description.ShouldBe("Wheat");
    }

    [Fact]
    public async Task ItShouldReturnANotFoundResultIfAFeedTypeWithTheGivenIdDoesNotExist()
    {
        // Arrange
        const string url = "/api/FeedType/-1";

        // Act
        HttpResponseMessage response = await _fixture.Client.GetAsync(url).ConfigureAwait(false);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.NotFound);
    }
}
