@echo off
REM UTF-8 인코딩 활성화
chcp 65001 >nul

REM 색상 설정 (초록)
color 0A

REM 창 제목
title 📝 TO DO 리스트 - 귀여운 앱 💖

cls
echo.
echo.
echo    ╔════════════════════════════════════════╗
echo    ║                                        ║
echo    ║    📝  TO DO 리스트  📝              ║
echo    ║         귀여운 데스크톱 앱            ║
echo    ║                  💖                   ║
echo    ║                                        ║
echo    ╚════════════════════════════════════════╝
echo.
echo.
echo  ⏳ 잠깐... 서버를 시작하고 있습니다...
echo.

REM Node.js 설치 확인
node -v >nul 2>&1
if errorlevel 1 (
    color 0C
    echo.
    echo  ❌ 에러! Node.js가 설치되지 않았습니다.
    echo.
    echo  아래 링크에서 설치하세요:
    echo  https://nodejs.org/
    echo.
    echo  설치 후 이 파일을 다시 실행하세요!
    echo.
    pause
    exit /b 1
)

REM npm install 확인
if not exist "node_modules" (
    echo  📦 의존성 설치 중...
    call npm install
)

echo.
echo  ✨ 브라우저를 열고 있습니다...
echo.

REM 브라우저 열기
start http://localhost:3000

REM 짧은 대기
timeout /t 2 /nobreak >nul

cls
echo.
echo    ✅ 서버 실행 중!
echo.
echo    🌐 브라우저에서 접속하세요: http://localhost:3000
echo.
echo    💾 데이터는 todos.json 에 저장됩니다
echo.
echo    이 창을 닫으면 앱이 종료됩니다.
echo.
echo    —————————————————————————————————————————
echo.

REM 서버 시작
call node server.js

pause
