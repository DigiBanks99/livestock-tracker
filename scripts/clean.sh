#! /bin/bash

printf "Cleaning dotnet solutions...\r\n"
cd ..
dotnet clean
printf "Removing bin folders...\r\n"
rimraf -rmf ./**/bin
printf "Removing obj folders...\r\n"
rimraf -rmf ./**/obj
printf "Removing node_modules...\r\n"
rimraf -rmf livestock/ClientApp/node_modules
printf "Removing Web UI dist directory...\r\n"
rimraf -rmf livestock/ClientApp/dist
cd scripts
