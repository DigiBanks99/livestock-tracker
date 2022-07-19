namespace Given.A.MedicineAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class CreatingAMedicine
{
    private readonly MedicineTestFixture _fixture;

    public CreatingAMedicine(MedicineTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task ItShouldCreateANewMedicine()
    {
        // Arrange
        CreateMedicineViewModel medicine = new("New Medication");

        // Act
        HttpResponseMessage response = await _fixture.Client.PostAsJsonAsync("/api/MedicineType", medicine).ConfigureAwait(false);

        // Assert
        response.EnsureSuccessStatusCode();
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        MedicineViewModel? createdMedicine = await response.Content.ReadFromJsonAsync<MedicineViewModel>();
        createdMedicine.ShouldNotBeNull();
        response.Headers.Location.ShouldNotBeNull();
        Uri expectedUri = new($"http://localhost/api/MedicineType/{createdMedicine.Id}");
        response.Headers.Location.ShouldBe(expectedUri);

        createdMedicine.Id.ShouldBeGreaterThan(2);
        createdMedicine.Description.ShouldBe(medicine.Description);

        _fixture.DatabaseConnection.Open();
        await using SqliteCommand cmd = new($"DELETE FROM MedicineTypes WHERE ID = {createdMedicine.Id}", _fixture.DatabaseConnection);
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
