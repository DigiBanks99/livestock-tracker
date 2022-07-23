using LivestockTracker.Logic.Paging;

namespace Given.A.FeedApi.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class SearchingForAFeedType
{
    private readonly IntegrationTestFixture _fixture;

    public SearchingForAFeedType(IntegrationTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task ItShouldReturnAllActiveFeedTypesWhenNoSearchQueryIsProvided()
    {
        // Arrange
        const string url = "/api/FeedType";

        // Act
        PagedData<FeedTypeViewModel>? feedTypes =
            await _fixture.Client.GetFromJsonAsync<PagedData<FeedTypeViewModel>>(url).ConfigureAwait(false);

        // Assert
        feedTypes.ShouldNotBeNull();
        feedTypes.Data.Count().ShouldBe(2);
    }

    [Fact]
    public async Task ItShouldReturnTheActiveFeedTypesThatMatchTheSearchQuery()
    {
        // Arrange
        const string url = "/api/FeedType?query=whe";

        // Act
        PagedData<FeedTypeViewModel>? feedTypes =
            await _fixture.Client.GetFromJsonAsync<PagedData<FeedTypeViewModel>>(url).ConfigureAwait(false);

        // Assert
        feedTypes.ShouldNotBeNull();
        FeedTypeViewModel feed = feedTypes.Data.ShouldHaveSingleItem();
        feed.IsDeleted.ShouldBeFalse();
        feed.Description.ShouldBe("Wheat");
        feed.Id.ShouldBe(1);
    }

    [Fact]
    public async Task ItShouldReturnTheInactiveFeedTypesIfIncludingDeletedFeedTypes()
    {
        // Arrange
        const string url = "/api/FeedType?includeDeleted=true";

        // Act
        PagedData<FeedTypeViewModel>? feedTypes =
            await _fixture.Client.GetFromJsonAsync<PagedData<FeedTypeViewModel>>(url).ConfigureAwait(false);

        // Assert
        feedTypes.ShouldNotBeNull();
        feedTypes.Data.Count().ShouldBe(3);
        feedTypes.Data.ShouldContain(feed =>
            feed.Id == 3
            && feed.IsDeleted
            && feed.Description == "Pallets");
    }

    [Fact]
    public async Task ItShouldPageCorrectly()
    {
        // Arrange
        const string url = "/api/FeedType?pageSize=1&pageNumber=1";

        // Act
        PagedData<FeedTypeViewModel>? feedTypes =
            await _fixture.Client.GetFromJsonAsync<PagedData<FeedTypeViewModel>>(url).ConfigureAwait(false);

        // Assert
        feedTypes.ShouldNotBeNull();
        feedTypes.Data.Count().ShouldBe(1);
        feedTypes.PageCount.ShouldBe(2);
        feedTypes.PageSize.ShouldBe(1);
        feedTypes.TotalRecordCount.ShouldBe(2);
        feedTypes.Data.ShouldContain(feed =>
            feed.Id == 2
            && !feed.IsDeleted
            && feed.Description == "Maize");
    }
}
