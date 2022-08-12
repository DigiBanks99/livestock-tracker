using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NuGet.Protocol;

namespace Given.A.FeedApi.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class UpdatingAFeedType
{
    private readonly IntegrationTestFixture _fixture;

    public UpdatingAFeedType(IntegrationTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task ThenItShouldSaveTheFeedTypeWithTheUpdatedValues()
    {
        // Arrange
        UpdateFeedTypeViewModel feed = new(1, "Changed");
        const string url = "/api/FeedType/1";

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, feed).ConfigureAwait(false);

        // Assert
        response.EnsureSuccessStatusCode();
        response.Content.Headers.ContentType.ShouldNotBeNull().ToString().ShouldBe("application/json; charset=utf-8");

        FeedTypeViewModel? updatedFeed = await response.Content.ReadFromJsonAsync<FeedTypeViewModel>();
        updatedFeed.ShouldNotBeNull();

        updatedFeed.Id.ShouldBe(feed.Id);
        updatedFeed.Description.ShouldBe(feed.Description);
        updatedFeed.IsDeleted.ShouldBeFalse();

        // Clean-up
        UpdateFeedTypeViewModel cleanup = new(1, "Wheat");
        await _fixture.Client.PutAsJsonAsync(url, cleanup);
    }

    [Fact]
    public async Task ThenItShouldReturnBadRequestWhenTheBodyIsNull()
    {
        // Arrange
        const string url = "/api/FeedType/1";
        UpdateFeedTypeViewModel? updateRequest = null;

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, updateRequest);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
        string content = await response.Content.ReadAsStringAsync();

        // It returns a problem descriptor. Need to try and see how I will handle that
        SerializableError? error = JsonConvert.DeserializeObject<SerializableError>(content);
        error.ShouldNotBeNull();
        string? message = error["errors"].ToJToken()["feedType"]?.Value<string>(0);
        message.ShouldBe("The feedType field is required.");
    }

    [Fact]
    public async Task ThenItShouldReturnBadRequestWhenTheRouteAndBodyIdsDoNotMatch()
    {
        // Arrange
        UpdateFeedTypeViewModel updateRequest = new(2, "Fail");
        const string url = "/api/FeedType/1";

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, updateRequest);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
        string content = await response.Content.ReadAsStringAsync();
        Dictionary<string, string[]>? keyValues = JsonConvert.DeserializeObject<Dictionary<string, string[]>>(content);
        keyValues.ShouldNotBeNull()["id"][0].ShouldBe("The id in the body and in the URL do not match.");
    }

    [Fact]
    public async Task ThenItShouldReturnANotFoundResultIfAFeedTypeWithTheGivenIdDoesNotExist()
    {
        // Arrange
        UpdateFeedTypeViewModel updateRequest = new(-1, "Fail");
        const string url = "/api/FeedType/-1";

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, updateRequest);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.NotFound);
    }
}
