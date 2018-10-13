#! /bin/bash

printf "Restoring NuGet packages...\r\n"
cd ..
dotnet restore
printf "Installing npm packages...\r\n"
cd livestock-tracker/ClientApp
npm install
cd scripts
