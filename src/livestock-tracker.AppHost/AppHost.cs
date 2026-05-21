var builder = DistributedApplication.CreateBuilder(args);

var api = builder.AddProject<Projects.livestock_tracker>("api")
    .WithExternalHttpEndpoints();

builder.Build().Run();
