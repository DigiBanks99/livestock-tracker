using LivestockTracker.Logic.Paging;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Linq;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;

namespace LivestockTracker.Medicine.IntegrationTests;

public class MedicalTransactionFetchTests
{
    [Fact]
    public async Task GetMedicalTransactions_Should_ReturnAllTransactions_WithNoQueryParams()
    {
        // Arrange
        var client = TestHelpers.CreateTestClient();

        // Act
        var response = await client.GetAsync("api/MedicalTransactions");

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        Assert.NotNull(response.Content.Headers.ContentType);
        Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType!.ToString());

        var transactions = await response.Content.ReadFromJsonAsync<PagedData<MedicalTransaction>>();
        Assert.NotNull(transactions);
        Assert.Equal(10, transactions!.Data.Count());
        Assert.Equal(45, transactions.TotalRecordCount);
        Assert.Equal(10, transactions.PageSize);
        Assert.Equal(5, transactions.PageCount);
    }
}
