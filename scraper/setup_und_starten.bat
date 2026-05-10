@echo off
chcp 65001 >nul
title docsdocs.net Scraper – Setup

echo.
echo ============================================================
echo   docsdocs.net Quiz-Scraper – Ersteinrichtung
echo ============================================================
echo.

:: Python prüfen
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Python nicht gefunden.
    echo.
    echo Installiere Python automatisch via winget ...
    winget install Python.Python.3.12 --silent --accept-package-agreements --accept-source-agreements
    if %errorlevel% neq 0 (
        echo.
        echo [FEHLER] Automatische Installation fehlgeschlagen.
        echo Bitte manuell installieren: https://www.python.org/downloads/
        echo Wichtig: Haken bei "Add Python to PATH" setzen!
        pause
        exit /b 1
    )
    echo.
    echo Python installiert. Starte Skript neu ...
    call "%~f0"
    exit /b
)

echo [OK] Python gefunden:
python --version
echo.

:: Playwright installieren
echo Installiere Playwright ...
python -m pip install --quiet --upgrade playwright
if %errorlevel% neq 0 (
    echo [FEHLER] pip-Installation fehlgeschlagen.
    pause
    exit /b 1
)

:: Chromium installieren
echo Installiere Chromium-Browser ...
python -m playwright install chromium
if %errorlevel% neq 0 (
    echo [FEHLER] Chromium-Installation fehlgeschlagen.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo   Setup abgeschlossen! Scraper wird gestartet ...
echo ============================================================
echo.
echo Optionen:
echo   [1] Normal (Headless – kein Browser-Fenster)
echo   [2] Debug  (Browser sichtbar + Screenshots)
echo   [3] Nur ein Fach scrapen
echo.
set /p MODE="Wahl (1/2/3): "

if "%MODE%"=="2" (
    python "%~dp0scrape_docsdocs.py" --debug
) else if "%MODE%"=="3" (
    set /p FACH="Fach eingeben (z.B. Chemie): "
    python "%~dp0scrape_docsdocs.py" --fach "%FACH%"
) else (
    python "%~dp0scrape_docsdocs.py"
)

echo.
echo [Fertig] Ergebnisse liegen im Ordner: output\
echo.
pause
