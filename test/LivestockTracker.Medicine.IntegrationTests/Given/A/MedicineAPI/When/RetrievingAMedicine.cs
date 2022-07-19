namespace Given.A.MedicineAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class RetrievingAMedicine
{
    private readonly MedicineTestFixture _fixture;

    public RetrievingAMedicine(MedicineTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task ItShouldReturnTheMedicineWithTheMatchingId()
    {
        // Arrange
        const string url = "/api/MedicineType/1";

        // Act
        MedicineViewModel? medicineType = await _fixture.Client.GetFromJsonAsync<MedicineViewModel>(url).ConfigureAwait(false);

        // Assert
        medicineType.ShouldNotBeNull();
        medicineType.Id.ShouldBe(1);
        medicineType.Deleted.ShouldBe(false);
        medicineType.Description.ShouldBe("Antibiotics");
    }

    [Fact]
    public async Task ItShouldReturnANotFoundResultIfAMedicineWithTheGivenIdDoesNotExist()
    {
        // Arrange
        const string url = "/api/MedicineType/-1";

        // Act
        HttpResponseMessage response = await _fixture.Client.GetAsync(url).ConfigureAwait(false);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.NotFound);
    }
}
