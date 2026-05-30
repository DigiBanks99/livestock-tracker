var builder = DistributedApplication.CreateBuilder(args);

#pragma warning disable ASPIREBROWSERLOGS001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.
var api = builder.AddProject<Projects.livestock_tracker>("api")
    .WithExternalHttpEndpoints()
    .WithBrowserLogs();

var frontend = builder
    .AddViteApp("frontend", "../livestock-tracker/ClientApp")
    .WithBrowserLogs()
    .WithReference(api)
    .WaitFor(api)
    .WithExternalHttpEndpoints();
#pragma warning restore ASPIREBROWSERLOGS001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.

api.PublishWithContainerFiles(frontend, "./wwwroot");

builder.Build().Run();
