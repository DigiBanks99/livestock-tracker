#! /bin/bash

dotnet ef database update -c SqliteLivestockContext -p ../src/livestock-tracker.database.sqlite/livestock-tracker.database.sqlite.csproj -s ../src/livestock-tracker/livestock-tracker.csproj --framework net6.0
