using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NuGet.Protocol;

namespace Given.A.MedicineAPI.When;

[Collection(IntegrationTestFixture.CollectionName)]
public class UpdatingAMedicine
{
    private readonly IntegrationTestFixture _fixture;

    public UpdatingAMedicine(IntegrationTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task ItShouldSaveTheMedicineWithTheUpdatedValues()
    {
        // Arrange
        UpdateMedicineViewModel medicineType = new(1, "Changed", true);
        const string url = "/api/MedicineType/1";

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, medicineType);

        // Assert
        response.EnsureSuccessStatusCode();
        response.Content.Headers.ContentType.ShouldNotBeNull().ToString().ShouldBe("application/json; charset=utf-8");

        MedicineViewModel? updatedMedicine = await response.Content.ReadFromJsonAsync<MedicineViewModel>();
        updatedMedicine.ShouldNotBeNull();

        updatedMedicine.Id.ShouldBe(medicineType.Id);
        updatedMedicine.Description.ShouldBe(medicineType.Description);
        updatedMedicine.Deleted.ShouldBe(medicineType.Deleted);

        // Clean-up
        UpdateMedicineViewModel cleanup = new(1, "Antibiotics");
        await _fixture.Client.PutAsJsonAsync(url, medicineType);
    }

    [Fact]
    public async Task ItShouldReturnBadRequestWhenTheBodyIsNull()
    {
        // Arrange
        const string url = "/api/MedicineType/1";
        UpdateMedicineViewModel? updateRequest = null;

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, updateRequest);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
        string content = await response.Content.ReadAsStringAsync();

        // It returns a problem descriptor. Need to try and see how I will handle that
        SerializableError? error = JsonConvert.DeserializeObject<SerializableError>(content);
        error.ShouldNotBeNull();
        string? message = error["errors"].ToJToken()["medicineType"]?.Value<string>(0);
        message.ShouldBe("The medicineType field is required.");
    }

    [Fact]
    public async Task ItShouldReturnBadRequestWhenTheRouteAndBodyIdsDoNotMatch()
    {
        // Arrange
        UpdateMedicineViewModel updateRequest = new(2, "Fail");
        const string url = "/api/MedicineType/1";

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, updateRequest);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
        string content = await response.Content.ReadAsStringAsync();
        Dictionary<string, string[]>? keyValues = JsonConvert.DeserializeObject<Dictionary<string, string[]>>(content);
        keyValues.ShouldNotBeNull()["id"][0].ShouldBe("The id in the body and in the URL do not match.");
    }

    [Fact]
    public async Task ItShouldReturnANotFoundResultIfAMedicineWithTheGivenIdDoesNotExist()
    {
        // Arrange
        UpdateMedicineViewModel updateRequest = new(-1, "Fail");
        const string url = "/api/MedicineType/-1";

        // Act
        HttpResponseMessage response = await _fixture.Client.PutAsJsonAsync(url, updateRequest);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.NotFound);
    }
}
