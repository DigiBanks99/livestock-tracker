#! /bin/bash

printf "Cleaning dotnet solutions..."
dotnet clean
printf "Removing bin folders..."
rimraf -rmf ./**/bin
printf "Removing obj folders..."
rimraf -rmf ./**/obj
