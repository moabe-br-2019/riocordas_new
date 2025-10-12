@echo off
chcp 65001 >nul
echo ========================================
echo   🚀 VERIFICAÇÃO PRÉ-DEPLOY
echo ========================================
echo.

echo [1/5] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado!
    pause
    exit /b 1
)
echo ✅ Node.js OK
echo.

echo [2/5] Instalando dependências...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências!
    pause
    exit /b 1
)
echo ✅ Dependências instaladas
echo.

echo [3/5] Executando build de teste...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build falhou! Corrija os erros antes de fazer deploy.
    pause
    exit /b 1
)
echo ✅ Build executado com sucesso
echo.

echo [4/5] Verificando arquivos críticos...
if not exist "src\pages\index.astro" (
    echo ❌ Arquivo index.astro não encontrado!
    pause
    exit /b 1
)
if not exist "src\pages\blog\index.astro" (
    echo ❌ Arquivo blog/index.astro não encontrado!
    pause
    exit /b 1
)
if not exist "public\imgs" (
    echo ⚠️  AVISO: Pasta de imagens não encontrada!
    echo Execute copiar-imagens.bat antes de fazer deploy
)
echo ✅ Arquivos críticos OK
echo.

echo [5/5] Limpando arquivos temporários...
if exist "dist" rmdir /s /q dist
echo ✅ Limpeza concluída
echo.

echo ========================================
echo   ✅ TUDO PRONTO PARA DEPLOY!
echo ========================================
echo.
echo Próximos passos:
echo 1. git add .
echo 2. git commit -m "Seu commit"
echo 3. git push
echo.
echo Consulte DEPLOY-GUIDE.md para instruções completas
echo.
pause
