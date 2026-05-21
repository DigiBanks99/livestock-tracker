var builder = DistributedApplication.CreateBuilder(args);

var api = builder.AddProject<Projects.livestock_tracker>("api")
    .WithExternalHttpEndpoints();

var frontend = builder.AddViteApp("frontend", "../livestock-tracker/ClientApp")
    .WithReference(api);

api.PublishWithContainerFiles(frontend, "./wwwroot");

builder.Build().Run();
