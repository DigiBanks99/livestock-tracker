using LivestockTracker.Animals;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Scaffold
builder.Services.AddControllersWithViews();
builder.Services.AddLivestockTrackerSqliteDatabase(builder.Configuration, builder.Environment)
    .AddLivestockTrackerLogic()
    .AddSwaggerGen();

// Build
WebApplication app = builder.Build();

// Configure Middleware
if (builder.Environment.IsDev())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.SeedLivestockDatabase()
    .UseHttpsRedirection()
    .UseStaticFiles()
    .UseRouting();

app.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
app.MapAnimalEndpoints();
app.MapFallbackToFile("index.html");

app.UseSwaggerMiddleware();

// Start
await app.RunAsync().ConfigureAwait(false);

/// <summary>
///     Visible for testing libraries
/// </summary>
public partial class Program
{
}
