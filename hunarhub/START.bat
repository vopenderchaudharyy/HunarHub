@echo off
REM HunarHub Quick Start Script for Windows

echo ======================================
echo HunarHub Quick Start
echo ======================================
echo.

echo Starting HunarHub Server...
start cmd /k "cd server && npm run dev"

timeout /t 2 /nobreak

echo Starting HunarHub Client...
start cmd /k "cd client && npm start"

echo.
echo ======================================
echo HunarHub is running!
echo ======================================
echo Client:  http://localhost:3000
echo Server:  http://localhost:5000
echo API:     http://localhost:5000/api
echo ======================================
echo.
echo Press Ctrl+C in each window to stop
