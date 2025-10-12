@echo off
echo Copiando imagens do projeto original para o projeto Astro...
echo.

set "origem=C:\Users\Moabe\Documents\DEV\sites\riocordas\imgs"
set "destino=C:\Users\Moabe\Documents\DEV\sites\riocordas_astro\public\imgs"

if not exist "%destino%" (
    mkdir "%destino%"
)

xcopy "%origem%\*.*" "%destino%\" /Y /I

echo.
echo Imagens copiadas com sucesso!
echo.
pause
