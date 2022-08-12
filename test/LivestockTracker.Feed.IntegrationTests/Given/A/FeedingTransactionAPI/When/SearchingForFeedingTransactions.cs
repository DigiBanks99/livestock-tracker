using System.Text;
using LivestockTracker.Pagination;

namespace Given.A.FeedingTransactionAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class SearchingForFeedingTransactions
{
    // Seed data:
    // 3x Animals
    // └── 15x feeding transactions each
    //      ├── 7x Feed Type ID 1
    //      └── 8x Feed Type ID 2
    private const int AnimalCount = 3;
    private const int FeedTypeId1Count = 7;
    private const int FeedTypeId2Count = 8;
    private const int AnimalFeedingTransactionCount = FeedTypeId1Count + FeedTypeId2Count;
    private const int AllRecordsCount = AnimalCount * AnimalFeedingTransactionCount;
    private readonly HttpClient _client;

    public SearchingForFeedingTransactions(IntegrationTestFixture fixture)
    {
        _client = fixture.Client;
    }

    [Fact]
    public async Task WithNoQueryParametersItShouldReturnAllFeedingTransactions()
    {
        // Act
        HttpResponseMessage response = await _client.GetAsync("api/FeedingTransaction");

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        PagedData<FeedingTransactionViewModel>? transactions =
            await response.Content.ReadFromJsonAsync<PagedData<FeedingTransactionViewModel>>();
        transactions.ShouldNotBeNull();
        transactions.Data.Count().ShouldBe(10);
        transactions.TotalRecordCount.ShouldBe(AllRecordsCount);
        transactions.PageSize.ShouldBe(10);
        transactions.PageCount.ShouldBe(5);
    }

    [Theory]
    [InlineData(1, AnimalCount * FeedTypeId1Count)]
    [InlineData(2, AnimalCount * FeedTypeId2Count)]
    public async Task ItShouldOnlyReturnTheFeedingTransactionsWithTheFeedTypesIdentifiedByTheFilter(
        int feedTypeId, int totalRecords)
    {
        // Act
        HttpResponseMessage response =
            await _client.GetAsync($"api/FeedingTransaction?feedTypeIds={feedTypeId}");

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        PagedData<FeedingTransactionViewModel>? transactions =
            await response.Content.ReadFromJsonAsync<PagedData<FeedingTransactionViewModel>>();
        transactions.ShouldNotBeNull();
        transactions.TotalRecordCount.ShouldBe(totalRecords);
        transactions.Data.ShouldAllBe(transaction => feedTypeId == transaction.FeedTypeId);
    }

    [Theory]
    [InlineData(1, AnimalCount * FeedTypeId2Count)]
    [InlineData(2, AnimalCount * FeedTypeId1Count)]
    public async Task AndExcludeIsTrueThenItShouldExcludeFeedingTransactionsWithFeedTypesNotIdentifiedByTheFilter(
        int feedTypeId, int totalRecords)
    {
        // Act
        HttpResponseMessage response =
            await _client.GetAsync($"api/FeedingTransaction?feedTypeIds={feedTypeId}&exclude=true");

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        PagedData<FeedingTransactionViewModel>? transactions =
            await response.Content.ReadFromJsonAsync<PagedData<FeedingTransactionViewModel>>();
        transactions.ShouldNotBeNull();
        transactions.TotalRecordCount.ShouldBe(totalRecords);
        transactions.Data.ShouldAllBe(transaction => feedTypeId != transaction.FeedTypeId);
    }

    [Theory]
    [InlineData(new[] { 1 })]
    [InlineData(new[] { 1, 2 })]
    [InlineData(new[] { 2, 3 })]
    [InlineData(new[] { 1, 2, 3 })]
    public async Task ItShouldOnlyReturnTheFeedingTransactionsOfTheAnimalsIdentifiedInTheFilter(int[] animalIds)
    {
        // Arrange
        StringBuilder query = new("api/FeedingTransaction?");
        for (int i = 0; i < animalIds.Length; i++)
        {
            if (i > 0)
            {
                query.Append('&');
            }

            query.Append($"animalIds={animalIds[i]}");
        }

        // Act
        HttpResponseMessage response = await _client.GetAsync(query.ToString());

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        PagedData<FeedingTransactionViewModel>? transactions =
            await response.Content.ReadFromJsonAsync<PagedData<FeedingTransactionViewModel>>();
        transactions.ShouldNotBeNull();
        transactions.TotalRecordCount.ShouldBe(animalIds.Length * AnimalFeedingTransactionCount);
        transactions.Data.ShouldAllBe(transaction => animalIds.Contains((int)transaction.AnimalId));
    }

    [Theory]
    [InlineData(new[] { 1 })]
    [InlineData(new[] { 1, 2 })]
    [InlineData(new[] { 2, 3 })]
    [InlineData(new[] { 1, 2, 3 })]
    public async Task AndExcludeIsTrueThenItShouldReturnAllFeedingTransactionForAnimalsNotIdentifiedInTheFilter(
        int[] animalIds)
    {
        // Arrange
        StringBuilder query = new("api/FeedingTransaction?");
        for (int i = 0; i < animalIds.Length; i++)
        {
            if (i > 0)
            {
                query.Append('&');
            }

            query.Append($"animalIds={animalIds[i]}");
        }

        query.Append("&exclude=true");

        // Act
        HttpResponseMessage response = await _client.GetAsync(query.ToString());

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        PagedData<FeedingTransactionViewModel>? transactions =
            await response.Content.ReadFromJsonAsync<PagedData<FeedingTransactionViewModel>>();
        transactions.ShouldNotBeNull();
        transactions.TotalRecordCount.ShouldBe(AllRecordsCount - (animalIds.Length * AnimalFeedingTransactionCount));
        transactions.Data.ShouldAllBe(transaction => !animalIds.Contains((int)transaction.AnimalId));
    }
}
