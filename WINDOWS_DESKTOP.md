# 🪟 Windows 데스크톱 앱으로 만들기

## 📋 옵션별 비교

| 방법 | 난이도 | 파일 크기 | 속도 | 추천 |
|------|--------|---------|------|------|
| **Electron** | 중간 | 150MB+ | 느림 | ⭐⭐⭐ |
| **Tauri** | 중상 | 10MB | 빠름 | ⭐⭐⭐⭐ |
| **Batch + 브라우저** | 쉬움 | 작음 | 빠름 | ⭐⭐ |

---

## 🎯 방법 1: Electron (가장 인기)

VS Code, Discord 같은 앱들이 Electron으로 만들어짐.

### 설치

```bash
npm install
npm install --save-dev electron electron-builder wait-on concurrently
```

### 개발 모드 실행

```bash
npm run electron-dev
```

- 왼쪽: 웹 서버 (localhost:3000)
- 오른쪽: Electron 앱
- 자동 새로고침 지원

### EXE 파일 만들기

```bash
npm run build-exe
```

생성 위치: `dist/TO DO 앱 1.0.0.exe`

### 특징
✅ 크로스플랫폼 (윈도우/맥/리눅스)
✅ 시스템 트레이 아이콘
✅ 기본 OS 기능 사용 가능
✅ 자동 업데이트 가능
❌ 파일 크기 크다 (150MB+)
❌ 메모리 사용량 많다

---

## 🚀 방법 2: Tauri (가장 빠름)

Rust 기반, 매우 가볍고 빠름. 요즘 트렌드!

### 설치

```bash
npm install -g tauri-cli
npm install
npm install --save-dev @tauri-apps/cli @tauri-apps/api
```

### 개발 실행

```bash
tauri dev
```

### 빌드

```bash
tauri build
```

생성: `src-tauri/target/release/TO DO 앱.exe` (3-5MB)

### 특징
✅ 매우 빠름
✅ 파일 크기 작음 (5-10MB)
✅ 메모리 효율적
✅ Rust 기반 (안전함)
✅ 최신 기술
❌ 커뮤니티 작음
❌ 학습곡선 가파름

---

## 💻 방법 3: 단순 Batch + 브라우저 (가장 쉬움)

```batch
@echo off
title TO DO 앱
start http://localhost:3000
node server.js
```

`.bat` 파일로 저장 → 더블클릭 → 실행!

### 특징
✅ 매우 간단
✅ 가볍다
❌ 전문적이지 않음
❌ 트레이 아이콘 없음
❌ 다양한 기능 불가능

---

## 🎨 추천 선택

### 일반 사용자 → **방법 3 (Batch)**
- 가장 빠르고 간단함
- 윈도우 버튼 하나로 시작 가능

### 개발자 → **방법 2 (Tauri)**
- 최신 기술
- 가벼움
- 앞으로의 업데이트 좋음

### 엔터프라이즈 → **방법 1 (Electron)**
- 가장 안정적
- 많은 도구 지원
- 커뮤니티 크다

---

## 🔧 지금 설정된 구조 (Electron)

```
todo-app/
├── server.js              # Express 서버
├── package.json           # 설정 + 빌드 스크립트
├── public/
│   ├── electron.js        # Electron 메인 프로세스
│   └── index.html         # 웹 UI
├── assets/
│   ├── icon.png           # 앱 아이콘
│   └── icon.ico           # Windows 아이콘
└── todos.json             # 데이터 파일
```

---

## 🎯 빠른 시작

### Electron 개발 모드

```bash
# 1. 폴더 정리
mkdir -p public/assets

# 2. 파일 배치
# - server.js → 루트
# - public/electron.js
# - public/index.html
# - package.json

# 3. 설치
npm install

# 4. 개발 실행
npm run electron-dev
```

### 아이콘 준비

`public/assets/icon.png` 파일이 필요함.

**임시로 없어도 되지만**, 아래 사이트에서 받을 수 있음:
- https://icon.horse/icon/github.com
- https://www.flaticon.com (체크박스 아이콘)

---

## 📦 배포 (최종 EXE)

### Electron으로 EXE 만들기

```bash
npm run build-exe
```

결과물: `dist/TO DO 앱 1.0.0.exe`

이 파일을 다른 사람에게 줌 → 설치 → 사용!

### 자동 설치 프로그램
- 스타트 메뉴 바로가기 자동 생성
- 제어판 > 프로그램 제거에 나타남
- 깔끔한 제거 가능

---

## 🎨 더 귀여운 UI

현재 UI는 이미 귀여운데, 더 하고 싶으면:

1. **컬러 변경**
```css
/* index.html 스타일 수정 */
background: linear-gradient(135deg, #ff6b9d 0%, #fec860 100%);
```

2. **폰트 변경**
```css
font-family: '귀엽고 둥근 폰트'
```

3. **아이콘 추가**
```
✨ 영화표 같은 유니코드
🎀 이모지
```

4. **애니메이션**
```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

---

## 🚀 가장 쉬운 방법: Batch 파일

1. `start.bat` 파일 만들기:

```batch
@echo off
color 0A
title 📝 TO DO 앱
echo 서버 시작 중...
start http://localhost:3000
node server.js
pause
```

2. 바탕화면에 바로가기 만들기
3. 아이콘 변경 (마우스 우클릭 > 속성)
4. 더블클릭 → 실행!

---

## 💡 결론

| 상황 | 추천 |
|------|------|
| 빨리 써야 함 | Batch |
| 예쁘게 배포 | Electron |
| 최신 기술 | Tauri |
| 친구한테 줌 | EXE 파일 |

---

**어떤 방법으로 할래요?** 🚀
