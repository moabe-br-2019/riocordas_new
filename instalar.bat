@echo off
chcp 65001 >nul
echo ========================================
echo   🚀 INSTALADOR RIO CORDAS ASTRO
echo ========================================
echo.

echo [1/4] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não está instalado!
    echo.
    echo Por favor, instale o Node.js em: https://nodejs.org
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js encontrado!
echo.

echo [2/4] Instalando dependências...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências!
    pause
    exit /b 1
)
echo ✅ Dependências instaladas!
echo.

echo [3/4] Copiando imagens...
call copiar-imagens.bat
echo.

echo [4/4] Tudo pronto!
echo.
echo ========================================
echo   ✅ INSTALAÇÃO CONCLUÍDA!
echo ========================================
echo.
echo Para iniciar o servidor, execute:
echo   npm run dev
echo.
echo O site estará disponível em:
echo   http://localhost:4321
echo.
echo ========================================
pause
