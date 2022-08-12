using LivestockTracker.Pagination;

namespace Given.A.MedicineAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class SearchingForAMedicine
{
    private readonly IntegrationTestFixture _fixture;

    public SearchingForAMedicine(IntegrationTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task ItShouldReturnAllActiveMedicinesWhenNoSearchQueryIsProvided()
    {
        // Arrange
        const string url = "/api/MedicineType";

        // Act
        PagedData<MedicineViewModel>? medicineTypes = await _fixture.Client
            .GetFromJsonAsync<PagedData<MedicineViewModel>>(url)
            .ConfigureAwait(false);

        // Assert
        medicineTypes.ShouldNotBeNull();
        medicineTypes.Data.Count().ShouldBe(2);
    }

    [Fact]
    public async Task ItShouldReturnTheActiveMedicinesThatMatchTheSearchQuery()
    {
        // Arrange
        const string url = "/api/MedicineType?query=ant";

        // Act
        PagedData<MedicineViewModel>? medicineTypes = await _fixture.Client
            .GetFromJsonAsync<PagedData<MedicineViewModel>>(url)
            .ConfigureAwait(false);

        // Assert
        medicineTypes.ShouldNotBeNull();
        MedicineViewModel medicine = medicineTypes.Data.ShouldHaveSingleItem();
        medicine.Deleted.ShouldBeFalse();
        medicine.Description.ShouldBe("Antibiotics");
        medicine.Id.ShouldBe(1);
    }

    [Fact]
    public async Task ItShouldReturnTheInactiveMedicinesIfIncludingDeletedMedicines()
    {
        // Arrange
        const string url = "/api/MedicineType?includeDeleted=true";

        // Act
        PagedData<MedicineViewModel>? medicineTypes = await _fixture.Client
            .GetFromJsonAsync<PagedData<MedicineViewModel>>(url)
            .ConfigureAwait(false);

        // Assert
        medicineTypes.ShouldNotBeNull();
        medicineTypes.Data.Count().ShouldBe(3);
        medicineTypes.Data.ShouldContain(medicine => IsParacetamol(medicine));
    }

    [Fact]
    public async Task ItShouldPageCorrectly()
    {
        // Arrange
        const string url = "/api/MedicineType?pageSize=1&pageNumber=1";

        // Act
        PagedData<MedicineViewModel>? medicineTypes = await _fixture.Client
            .GetFromJsonAsync<PagedData<MedicineViewModel>>(url)
            .ConfigureAwait(false);

        // Assert
        medicineTypes.ShouldNotBeNull();
        medicineTypes.Data.Count().ShouldBe(1);
        medicineTypes.PageCount.ShouldBe(2);
        medicineTypes.PageSize.ShouldBe(1);
        medicineTypes.TotalRecordCount.ShouldBe(2);
        medicineTypes.Data.ShouldContain(medicine => IsPainkillers(medicine));
    }

    private static bool IsPainkillers(MedicineViewModel medicine)
    {
        return medicine == new MedicineViewModel(2, "Painkillers");
    }

    private static bool IsParacetamol(MedicineViewModel medicine)
    {
        return medicine == new MedicineViewModel(3, "Paracetamol", true);
    }
}
