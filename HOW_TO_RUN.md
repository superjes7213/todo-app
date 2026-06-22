# 🚀 시작하기

## 📌 가장 쉬운 방법 (추천!)

### 1️⃣ Node.js 설치
https://nodejs.org 에서 LTS 버전 설치 (기본값으로 OK)

### 2️⃣ 폴더 준비

다운로드한 파일들을 한 폴더에 모으세요:

```
my-todo-app/
├── server.js
├── package.json
├── RUN_ME.bat          ⭐ 이 파일을 실행!
├── start.bat           (대체용)
└── public/
    ├── electron.js
    └── index.html
```

### 3️⃣ RUN_ME.bat 더블클릭! 🎉

```
더블클릭 → 자동으로 모든 게 실행됨!
```

끝! 브라우저에서 `http://localhost:3000` 열림.

---

## 🎨 윈도우에서 예쁘게 띄우기

### 옵션 A: 가장 간단 (지금 상태)
```
RUN_ME.bat 더블클릭 → 브라우저 + 터미널
```
✅ 장점: 가장 간단, 빠름
❌ 단점: 터미널 창 보임

### 옵션 B: Electron (데스크톱 앱처럼)
```bash
npm install
npm install --save-dev electron electron-builder concurrently wait-on
npm run electron-dev
```

✅ 장점: 전문적, 트레이 아이콘, 예쁨
❌ 단점: 설치가 조금 복잡, 파일 크기 큼

### 옵션 C: Tauri (가장 빠름)
```bash
npm install
npm install --save-dev tauri-cli
tauri dev
```

✅ 장점: 매우 빠르고 가벼움
❌ 단점: Rust 설치 필요

---

## 📝 상세 설명

### 파일별 역할

| 파일 | 설명 |
|------|------|
| `RUN_ME.bat` | Windows용 시작 파일 (권장) |
| `start.bat` | 간단한 버전 |
| `server.js` | 백엔드 (Node.js 서버) |
| `public/index.html` | 프론트엔드 (브라우저 UI) |
| `package.json` | 설정 + 의존성 |
| `todos.json` | 데이터 저장 (자동 생성) |

### 포트

- **3000**: 주 서버
- 다른 포트 사용하려면 `server.js` 수정

---

## 🔧 문제 해결

### ❌ "Node.js를 찾을 수 없습니다"
→ Node.js 설치 후 재부팅 필요

### ❌ "포트 3000이 이미 사용 중입니다"
```bash
# server.js 파일에서 PORT 값 변경
const PORT = 3001;  // 3000 → 3001
```

### ❌ "npm install이 안 됨"
```bash
# 관리자 권한으로 cmd 실행
npm install -g npm  # npm 최신화
```

### ❌ "RUN_ME.bat가 실행 안 됨"
→ 오른쪽 클릭 > 속성 > 블록 해제 체크 > 확인

---

## 🌟 더 예쁘게 만들기

### 1. 데스크톱 바로가기 만들기
1. `RUN_ME.bat` 우클릭
2. 바로가기 만들기
3. 바로가기 우클릭 > 속성
4. 시작 위치: 앱 폴더 경로
5. 아이콘 변경 (아래 참조)

### 2. 아이콘 변경
1. 바로가기 우클릭 > 속성
2. 고급 > 다른 아이콘 찾기
3. 아이콘 선택

### 3. 터미널 숨기기 (Electron 방식)
```bash
npm run electron-dev
```

---

## 🎯 한 줄 요약

```
1. Node.js 설치
2. RUN_ME.bat 더블클릭
3. 끝!
```

---

## 💡 팁

- 데이터는 `todos.json`에 저장됨 (안전함)
- 서버를 끄면 (터미널 닫기) 앱 종료
- 브라우저는 계속 띄워도 OK (데이터 로드)
- `Ctrl+Shift+Delete`로 개발자 도구 열기

---

**시작하면 됩니다!** 🚀
