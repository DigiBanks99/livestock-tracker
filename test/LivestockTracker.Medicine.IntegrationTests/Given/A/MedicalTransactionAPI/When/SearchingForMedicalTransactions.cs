using LivestockTracker.Logic.Paging;
using System.Text;

namespace Given.A.MedicalTransactionAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class SearchingForMedicalTransactions
{
    private readonly HttpClient _client;

    public SearchingForMedicalTransactions(IntegrationTestFixture fixture)
    {
        _client = fixture.Client;
    }

    // Seed data:
    // 3x Animals
    // └── 15x medical transactions each
    //      ├── 7x Medicine Type ID 1
    //      └── 8x Medicine Type ID 2
    private const int AnimalCount = 3;
    private const int MedicineTypeId1Count = 7;
    private const int MedicineTypeId2Count = 8;
    private const int AnimalMedicalTransactionCount = MedicineTypeId1Count + MedicineTypeId2Count;
    private const int AllRecordsCount = AnimalCount * AnimalMedicalTransactionCount;

    [Fact]
    public async Task WithNoQueryParametersItShouldReturnAllMedicalTransactions()
    {
        // Act
        HttpResponseMessage? response = await _client.GetAsync("api/MedicalTransactions");

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        PagedData<MedicalTransaction>? transactions = await response.Content.ReadFromJsonAsync<PagedData<MedicalTransaction>>();
        transactions.ShouldNotBeNull();
        transactions.Data.Count().ShouldBe(10);
        transactions.TotalRecordCount.ShouldBe(AllRecordsCount);
        transactions.PageSize.ShouldBe(10);
        transactions.PageCount.ShouldBe(5);
    }

    [Theory]
    [InlineData(1, AnimalCount * MedicineTypeId1Count)]
    [InlineData(2, AnimalCount * MedicineTypeId2Count)]
    public async Task ItShouldOnlyReturnTheMedicalTransactionsWithTheMedicineTypeIdentifiedByTheFilter(int medicineTypeId, int totalRecords)
    {
        // Act
        HttpResponseMessage? response = await _client.GetAsync($"api/MedicalTransactions?medicineType={medicineTypeId}");

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        PagedData<MedicalTransaction>? transactions = await response.Content.ReadFromJsonAsync<PagedData<MedicalTransaction>>();
        transactions.ShouldNotBeNull();
        transactions.TotalRecordCount.ShouldBe(totalRecords);
        transactions.Data.ShouldAllBe(transaction => medicineTypeId == transaction.MedicineId);
    }

    [Theory]
    [InlineData(1, AnimalCount * MedicineTypeId2Count)]
    [InlineData(2, AnimalCount * MedicineTypeId1Count)]
    public async Task AndExcludeIsTrueThenItShouldExcludeMedicalTransactionsWithMedicineTypesNorIdentifiedByTheFilter(int medicineTypeId, int totalRecords)
    {
        // Act
        HttpResponseMessage? response = await _client.GetAsync($"api/MedicalTransactions?medicineType={medicineTypeId}&exclude=true");

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        PagedData<MedicalTransaction>? transactions = await response.Content.ReadFromJsonAsync<PagedData<MedicalTransaction>>();
        transactions.ShouldNotBeNull();
        transactions.TotalRecordCount.ShouldBe(totalRecords);
        transactions.Data.ShouldAllBe(transaction => medicineTypeId != transaction.MedicineId);
    }

    [Theory]
    [InlineData(new int[] { 1 })]
    [InlineData(new int[] { 1, 2 })]
    [InlineData(new int[] { 2, 3 })]
    [InlineData(new int[] { 1, 2, 3 })]
    public async Task ItShouldOnlyReturnTheMedicalTransactionsOfTheAnimalsIdentifiedInTheFilter(int[] animalIds)
    {
        // Arrange
        StringBuilder query = new("api/MedicalTransactions?");
        for (int i = 0; i < animalIds.Length; i++)
        {
            if (i > 0)
            {
                query.Append('&');
            }

            query.Append($"animalIds={animalIds[i]}");
        }

        // Act
        HttpResponseMessage? response = await _client.GetAsync(query.ToString());

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        PagedData<MedicalTransaction>? transactions = await response.Content.ReadFromJsonAsync<PagedData<MedicalTransaction>>();
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
        StringBuilder query = new("api/MedicalTransactions?");
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
        HttpResponseMessage? response = await _client.GetAsync(query.ToString());

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        PagedData<MedicalTransaction>? transactions = await response.Content.ReadFromJsonAsync<PagedData<MedicalTransaction>>();
        transactions.ShouldNotBeNull();
        transactions!.TotalRecordCount.ShouldBe(AllRecordsCount - (animalIds.Length * AnimalMedicalTransactionCount));
        transactions.Data.ShouldAllBe(transaction => !animalIds.Contains((int)transaction.AnimalId));
    }
}
