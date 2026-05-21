using LivestockTracker;
using LivestockTracker.Extensions;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddControllersWithViews();
builder.Services.AddLivestockTrackerSqliteDatabase(builder.Configuration, builder.Environment)
    .AddLivestockTrackerLogic()
    .AddLivestockTrackerOpenApi();

var app = builder.Build();

if (app.Environment.IsDev())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.SeedLivestockDatabase()
    .UseHttpsRedirection()
    .UseStaticFiles();

app.UseRouting();

app.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");

app.MapOpenApi();
app.MapScalarApiReference();

app.MapFallbackToFile("index.html");

app.MapDefaultEndpoints();

app.Run();

/// <summary>
/// Partial class to support WebApplicationFactory in integration tests.
/// </summary>
public partial class Program;

