namespace Given.A.MedicineAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class CreatingAMedicine
{
    private readonly IntegrationTestFixture _fixture;

    public CreatingAMedicine(IntegrationTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task ItShouldCreateANewMedicine()
    {
        // Arrange
        MedicineType medicine = new()
        {
            Description = "New medication"
        };

        // Act
        HttpResponseMessage response = await _fixture.Client.PostAsJsonAsync("/api/MedicineType", medicine).ConfigureAwait(false);

        // Assert
        response.EnsureSuccessStatusCode();
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        MedicineType? createdMedicine = await response.Content.ReadFromJsonAsync<MedicineType>();
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

    [Fact]
    public async Task ThenItShouldReturnBadRequestIfAMedicineWithTheSameIdExists()
    {
        // Arrange
        MedicineType medicine = new()
        {
            Id = 1,
            Description = "New medication"
        };

        // Act
        HttpResponseMessage response = await _fixture.Client.PostAsJsonAsync("/api/MedicineType", medicine).ConfigureAwait(false);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
        response.Content.Headers.ContentType.ShouldNotBeNull();
        response.Content.Headers.ContentType.ToString().ShouldBe("application/json; charset=utf-8");

        string responseMessage = await response.Content.ReadAsStringAsync();
        responseMessage.ShouldBe("\"A Medicine with key 1 already exists.\"");

        _fixture.DatabaseConnection.Open();
        await using SqliteCommand cmd = new("SELECT COUNT(ID) FROM MedicineTypes", _fixture.DatabaseConnection);
        try
        {
            object? count = cmd.ExecuteScalar();
            count.ShouldNotBeNull().ShouldBeAssignableTo<long>().ShouldBe(2);
        }
        finally
        {
            _fixture.DatabaseConnection.Close();
        }
    }
}
