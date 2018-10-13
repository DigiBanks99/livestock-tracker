#! /bin/bash

printf "Building dotnet core libraries...\r\n"
cd ..
dotnet build
printf "Building Web UI...\r\n"
cd livestock-tracker/ClientApp
npm run build
cd ../../scripts
