@ECHO OFF

SET NODE_MODULES_DIR="%~dp0..\node_modules"
SET ASSETS_DIR="%~dp0..\src\assets"
SET MATERIAL_ICON_SRC_DIR="%NODE_MODULES_DIR%\material-design-icons\iconfont"
SET MATERIAL_ICON_DEST_DIR="%ASSETS_DIR%\material-icons"

ECHO Copying material icons to assets folder
XCOPY /Y /S /I "%MATERIAL_ICON_SRC_DIR%" "%MATERIAL_ICON_DEST_DIR%"
DEL /S /Q "%MATERIAL_ICON_DEST_DIR%\*.md"

@ECHO ON
