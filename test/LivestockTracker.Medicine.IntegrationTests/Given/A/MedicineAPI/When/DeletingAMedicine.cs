namespace Given.A.MedicineAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class DeletingAMedicine
{
    private readonly IntegrationTestFixture _fixture;

    public DeletingAMedicine(IntegrationTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async void ItShouldMarkTheRemovedItemAsDeleted()
    {
        // Arrange
        const string url = "/api/MedicineType/1";

        // Act
        HttpResponseMessage response = await _fixture.Client.DeleteAsync(url).ConfigureAwait(false);

        // Assert
        response.EnsureSuccessStatusCode();
        _fixture.DatabaseConnection.Open();

        const string query = "SELECT Deleted FROM MedicineTypes WHERE Id = 1";
        await using SqliteCommand command = new(query, _fixture.DatabaseConnection);
        object? result = command.ExecuteScalar();
        long numericResult = result.ShouldBeAssignableTo<long>();
        Convert.ToBoolean(numericResult).ShouldBeTrue();

        // Clean-up
        const string cleanup = "UPDATE MedicineTypes SET Deleted = 0 WHERE Id = 1";
        await using SqliteCommand cleanupCommand = new(cleanup, _fixture.DatabaseConnection);
        cleanupCommand.ExecuteNonQuery();
        _fixture.DatabaseConnection.Close();
    }

    [Fact]
    public async void ItShouldReturnANotFoundResultIfAMedicineWithTheGivenIdDoesNotExist()
    {
        // Arrange
        const string url = "/api/MedicineType/-1";

        // Act
        HttpResponseMessage response = await _fixture.Client.DeleteAsync(url).ConfigureAwait(false);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.NotFound);
    }
}
