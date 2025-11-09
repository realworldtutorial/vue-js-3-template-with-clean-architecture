@echo off
echo ====================================
echo Vue Clean Architecture Full Stack
echo ====================================
echo.
echo This script will start both the backend server and frontend application
echo.
echo Starting Backend Server...
start cmd /k "cd server && npm run dev"
echo.
echo Waiting 3 seconds for server to start...
timeout /t 3 /nobreak >nul
echo.
echo Starting Frontend Application...
start cmd /k "npm run dev"
echo.
echo ====================================
echo Both applications are starting!
echo ====================================
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:5173
echo ====================================
echo.
pause
