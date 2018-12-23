#!/bin/bash

workingDir=(`pwd`)
nodeModulesDir="$workingDir/../node_modules"
assetsDir="$workingDir/../src/assets"
materialIconSrcDir="$nodeModulesDir/material-design-icons/iconfont"
materialIconDestDir="$assetsDir/material-icons"

echo "Copying material icons to assets folder"
cp $materialIconSrcDir/* $materialIconDestDir/
rm $materialIconDestDir/*.md
