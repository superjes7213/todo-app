@echo off
chcp 65001 >nul
color 0A
title 📝 TO DO 앱

echo.
echo ==========================================
echo        📝 귀여운 TO DO 앱
echo ==========================================
echo.
echo 🚀 서버 시작 중...
echo.

start http://localhost:3000
timeout /t 2 >nul

node server.js

pause
