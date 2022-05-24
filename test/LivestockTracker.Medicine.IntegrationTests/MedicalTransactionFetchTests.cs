using LivestockTracker.Logic.Paging;
using LivestockTracker.Medicine;
using Shouldly;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Given.A.MedicalTransactionService.When;

public class SearchingForMedicalTransactions
{
    private readonly HttpClient _client;

    public SearchingForMedicalTransactions()
    {
        _client = TestHelpers.CreateTestClient();
    }

    // Seed data:
    // 3x Animals
    // └── 15x medical transactions each
    //      ├── 7x Medicine Type ID 1
    //      └── 8x Medicine Type ID 2
    const int AnimalCount = 3;
    const int MedicineTypeId1Count = 7;
    const int MedicineTypeId2Count = 8;
    const int AnimalMedicalTransactionCount = MedicineTypeId1Count + MedicineTypeId2Count;
    const int AllRecordsCount = AnimalCount * AnimalMedicalTransactionCount;

    [Fact]
    public async Task WithNoQueryParametersItShouldReturnAllMedicalTransactions()
    {
        // Act
        var response = await _client.GetAsync("api/MedicalTransactions");

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        Assert.NotNull(response.Content.Headers.ContentType);
        Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType!.ToString());

        var transactions = await response.Content.ReadFromJsonAsync<PagedData<MedicalTransaction>>();
        Assert.NotNull(transactions);
        Assert.Equal(10, transactions!.Data.Count());
        Assert.Equal(AllRecordsCount, transactions.TotalRecordCount);
        Assert.Equal(10, transactions.PageSize);
        Assert.Equal(5, transactions.PageCount);
    }

    [Theory]
    [InlineData(1, AnimalCount * MedicineTypeId1Count)]
    [InlineData(2, AnimalCount * MedicineTypeId2Count)]
    public async Task ItShouldOnlyReturnTheMedicalTransactionsWithTheMedicineTypeIdentifiedByTheFilter(int medicineTypeId, int totalRecords)
    {
        // Act
        var response = await _client.GetAsync($"api/MedicalTransactions?medicineType={medicineTypeId}");

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        Assert.NotNull(response.Content.Headers.ContentType);
        Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType!.ToString());

        var transactions = await response.Content.ReadFromJsonAsync<PagedData<MedicalTransaction>>();
        Assert.NotNull(transactions);
        Assert.Equal(totalRecords, transactions!.TotalRecordCount);
        Assert.All(transactions.Data, transaction => Assert.Equal(medicineTypeId, transaction.MedicineId));
    }

    [Theory]
    [InlineData(1, AnimalCount * MedicineTypeId2Count)]
    [InlineData(2, AnimalCount * MedicineTypeId1Count)]
    public async Task AndExcludeIsTrueThenItShouldExcludeMedicalTransactionsWithMedicineTypesNorIdentifiedByTheFilter(int medicineTypeId, int totalRecords)
    {
        // Act
        var response = await _client.GetAsync($"api/MedicalTransactions?medicineType={medicineTypeId}&exclude=true");

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        Assert.NotNull(response.Content.Headers.ContentType);
        Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType!.ToString());

        var transactions = await response.Content.ReadFromJsonAsync<PagedData<MedicalTransaction>>();
        Assert.NotNull(transactions);
        Assert.Equal(totalRecords, transactions!.TotalRecordCount);
        Assert.All(transactions.Data, transaction => Assert.NotEqual(medicineTypeId, transaction.MedicineId));
    }

    [Theory]
    [InlineData(new int[] { 1 })]
    [InlineData(new int[] { 1, 2 })]
    [InlineData(new int[] { 2, 3 })]
    [InlineData(new int[] { 1, 2, 3 })]
    public async Task ItShouldOnlyReturnTheMedicalTransactionsOfTheAnimalsIdentifiedInTheFilter(int[] animalIds)
    {
        // Arrange
        var query = new StringBuilder("api/MedicalTransactions?");
        for (var i = 0; i < animalIds.Length; i++)
        {
            if (i > 0)
            {
                query.Append('&');
            }

            query.Append($"animalIds={animalIds[i]}");
        }

        // Act
        var response = await _client.GetAsync(query.ToString());

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        Assert.NotNull(response.Content.Headers.ContentType);
        Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType!.ToString());

        var transactions = await response.Content.ReadFromJsonAsync<PagedData<MedicalTransaction>>();
        transactions.ShouldNotBeNull();
        transactions!.TotalRecordCount.ShouldBe(animalIds.Length * AnimalMedicalTransactionCount);
        transactions.Data.ShouldAllBe(transaction => animalIds.Contains((int)transaction.AnimalId));
    }

    [Theory]
    [InlineData(new int[] { 1 })]
    [InlineData(new int[] { 1, 2 })]
    [InlineData(new int[] { 2, 3 })]
    [InlineData(new int[] { 1, 2, 3 })]
    public async Task AndExcludeIsTrueThenItShouldReturnAllMedicalTransactionForAnimalsNotIdentifiedInTheFilter(int[] animalIds)
    {
        // Arrange
        var query = new StringBuilder("api/MedicalTransactions?");
        for (var i = 0; i < animalIds.Length; i++)
        {
            if (i > 0)
            {
                query.Append('&');
            }

            query.Append($"animalIds={animalIds[i]}");
        }

        query.Append("&exclude=true");

        // Act
        var response = await _client.GetAsync(query.ToString());

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        Assert.NotNull(response.Content.Headers.ContentType);
        Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType!.ToString());

        var transactions = await response.Content.ReadFromJsonAsync<PagedData<MedicalTransaction>>();
        transactions.ShouldNotBeNull();
        transactions!.TotalRecordCount.ShouldBe(AllRecordsCount - animalIds.Length * AnimalMedicalTransactionCount);
        transactions.Data.ShouldAllBe(transaction => !animalIds.Contains((int)transaction.AnimalId));
    }
}
