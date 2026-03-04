# Gailab Chatbot Web - Frontend

이 프로젝트는 지아이랩에서 용역 및 내부 서비스에 공통으로 활용할 수 있도록 구성된
범용 챗봇 웹 프론트엔드 구조입니다.

프로젝트별 요구사항에 따라 설정과 UI 구성만 변경하여
다양한 형태의 챗봇 서비스를 빠르게 구성할 수 있도록 설계되었습니다.


---

## 📌 프로젝트 개요

이 프로젝트는 다음과 같은 목적을 가지고 있습니다.

- 용역 및 내부 프로젝트에서 공통으로 사용할 수 있는 챗봇 프론트엔드 구조 제공
- 챗봇의 기본 로직과 화면 흐름을 표준화
- 프로젝트 성격에 맞게 UI와 기능을 선택적으로 구성 가능
- 디자인 변경이나 기능 조합이 필요한 경우에도 구조 수정 부담 최소화

---

## 🛠 기술 스택

- **React** ^19.1.1 - UI 라이브러리
- **React Router DOM** ^7.13.0 - 클라이언트 사이드 라우팅
- **Vite** ^7.1.7 - 빌드 도구 (빠른 개발 서버 및 HMR 지원)
- **Axios** ^1.13.0 - 백엔드 API 통신
- **CSS Modules** - 컴포넌트별 스타일 격리

---

## 📁 프로젝트 구조

```
📦src
 ┣ 📂api                    # 백엔드 API 통신 모듈
 ┃ ┣ 📜authApi.js           # 인증 관련 API
 ┃ ┗ 📜chatApi.js           # 챗봇 대화 관련 API
 ┃
 ┣ 📂assets
 ┃
 ┣ 📂components             # UI 컴포넌트
 ┃ ┣ 📂ChatHeader             # 상단 헤더
 ┃ ┣ 📂ChatInput              # 사용자 입력 영역
 ┃ ┣ 📂ChatMessageList        # 메시지 목록
 ┃ ┣ 📂Message                # 메시지(말풍선) UI
 ┃ ┣ 📂TypingIndicator        # 응답 대기 표시
 ┃ ┗ 📂DesignShowcase         # 챗봇 UI 패턴 컴포넌트 모음
 ┃   ┣ 📂Card
 ┃   ┣ 📂ImageCard
 ┃   ┣ 📂List
 ┃   ┣ 📂NaturalLanguage
 ┃   ┣ 📂QuickFly
 ┃   ┗ 📂QuickMenu
 ┃
 ┣ 📂config                  # 챗봇 설정
 ┃ ┗ 📜chatbotConfig.js
 ┃
 ┣ 📂hooks                   # ✨ Custom Hooks
 ┃ ┣ 📜useChatMessages.js    # 메시지 상태 관리
 ┃ ┗ 📜useAuth.js            # 인증 상태 관리
 ┃
 ┣ 📂services                # ✨ 비즈니스 로직
 ┃ ┗ 📜messageHandlers.js    # 메시지 처리 서비스
 ┃
 ┣ 📂pages                   # 페이지 컴포넌트
 ┃ ┣ 📂LoginPage              # 로그인 페이지
 ┃ ┣ 📂Register               # 회원가입 페이지
 ┃ ┣ 📂ScenarioAPage          # 시나리오(업무) 선택 페이지
 ┃ ┗ 📂ChatPage               # 메인 챗봇 페이지
 ┃
 ┣ 📜App.jsx
 ┗ 📜main.jsx
```

---

## 🧩 범용 챗봇 구조 설명

### 1. 설정 중심 구조

챗봇의 이름, 초기 메시지, 활성화 기능, 퀵메뉴 구성 등은
`src/config/chatbotConfig.js`에서 관리합니다.

```javascript
{
  name: "챗봇 이름",
  initialMessage: "초기 메시지",
  features: {
    login: false,
    textInputWithAI: false,
    programRecommendation: false,
    programInfo: false,
    platformGuide: false,
    faqSearch: true,
    quickMenu: true,
    designShowcase: true,
  },
  api: {
    sbizUrl: SBIZ_URL,
    chatbotUrl: CHATBOT_URL,
  },
  quickMenuButtons: [
    { type: "MENU1", label: "챗봇 디자인" },
    { type: "MENU2", label: "예시 1" },
  ],
}
```


### 2. 페이지 흐름

```
App.jsx
 ├─ LoginPage          (/)           # 로그인
 ├─ Register           (/register)   # 회원가입
 ├─ ScenarioAPage      (/scenario)   # 업무 종류 선택 (회의록, 회사내규, 사업계획서 등)
 └─ ChatPage           (/chat)       # 메인 챗봇
      ├─ Custom Hooks (상태 관리)
      │   ├─ useChatMessages (메시지 관리)
      │   └─ useAuth (인증 관리)
      ├─ 서비스 레이어 (비즈니스 로직)
      │   └─ messageHandlers (메시지 처리)
      └─ UI 컴포넌트 (표현)
```

**페이지 접근 제어:**
- 로그인 → 시나리오 선택 → 챗봇 순서로 이동해야 합니다
- 각 페이지는 이전 단계를 거쳤는지 `location.state`로 확인합니다
- 현재 백엔드/DB가 연결되지 않은 상태이므로, 브라우저 URL에 직접 경로를 입력하면 페이지 접근이 가능합니다
  - 예: `http://localhost:5173/scenario`, `http://localhost:5173/chat`


### 3. DesignShowcase (UI 구성 요소)

DesignShowcase는 디자인 샘플만을 위한 영역이 아니라,
범용 챗봇 구조 위에 다양한 UI 패턴을 적용하기 위한 컴포넌트 모음입니다.

**포함된 UI 패턴:**

- **NaturalLanguage**: 자유 입력 기반 챗봇
- **QuickMenu**: 하단 고정 퀵메뉴
- **QuickFly**: 플로팅 퀵메뉴
- **List**: 리스트 형태 응답 UI
- **Card**: 카드 기반 정보 표시
- **ImageCard**: 이미지 중심 카드 UI

**각 UI는:**
- 독립적인 컴포넌트 구조
- 필요에 따라 선택·조합 가능
- 프로젝트 요구사항에 맞게 커스터마이징 가능

👉 이를 통해 용역별 맞춤형 챗봇 UI 구성이 가능합니다.

---


## 🔧 환경 설정

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 설정합니다.

```env
# 챗봇 타입 선택 (sample, general 등)
VITE_CHATBOT_TYPE=sample

# 인증 서버 주소 (로그인, 회원가입, 세션 관리)
VITE_SBIZ_URL=http://localhost:8089

# 챗봇 서버 주소 (대화 처리)
VITE_CHATBOT_URL=http://localhost:9011
```

### 개발 중 로그인 우회

DB나 백엔드 없이 프론트엔드만 개발할 때, `.env.development`에서 로그인 인증을 우회할 수 있습니다.

```env
# .env.development
VITE_DEV_SKIP_AUTH=true
```

- `true`로 설정 시: 로그인 없이 `/scenario`, `/chat` 페이지에 직접 접근 가능
- `false`이거나 미설정 시: 기존 로그인 가드 정상 동작
- `.env.production`에는 이 값을 설정하지 마세요

> **현재 상태:** 백엔드 auth 관련 코드가 없어 DB 연결이 되지 않은 상태입니다.
> 로그인 페이지의 비밀번호 토글 기능만 구현되어 있으며, 실제 인증 로직은 백엔드 연동 후 추가 예정입니다.
> 개발 중에는 `VITE_DEV_SKIP_AUTH=true` 설정 또는 URL 직접 입력으로 페이지 이동이 가능합니다.

---

### 백엔드 연동

프론트엔드는 두 개의 백엔드 서버와 통신합니다.

| 서버 | 환경 변수 | 기본 포트 | 용도 |
|---|---|---|---|
| 인증 서버 | `VITE_SBIZ_URL` | 8089 | 로그인, 회원가입, 세션 관리 |
| 챗봇 서버 | `VITE_CHATBOT_URL` | 9011 | 대화 메시지 처리 |

#### 인증 API (`authApi.js` → 인증 서버)

인증은 세션 쿠키 기반(`withCredentials: true`)으로 동작합니다.

| 메서드 | 엔드포인트 | 설명 | 요청 body |
|---|---|---|---|
| POST | `/api/login` | 로그인 | `{ loginId, password }` |
| POST | `/api/register` | 회원가입 | `{ loginId, password }` |
| GET | `/api/session` | 세션 확인 | - |
| POST | `/api/logout` | 로그아웃 | - |

#### 챗봇 API (`chatApi.js` → 챗봇 서버)

| 메서드 | 엔드포인트 | 설명 | 요청 body |
|---|---|---|---|
| POST | `/api/chat/message` | 텍스트 메시지 전송 | `{ text }` |
| POST | `/api/chat/service` | GUI 버튼 액션 호출 | `{ type, payload }` |

> **백엔드 구현 시 참고:** 위 엔드포인트에 맞춰 API를 구현하면 프론트엔드와 바로 연동됩니다.
> 인증 서버는 세션 쿠키를 발급해야 하며, CORS 설정에서 `credentials: true`를 허용해야 합니다.

---

## 🚀 실행 방법

```bash
npm install
npm run dev
```

**개발 서버:** http://localhost:5173

---

## 📌 정리

- 설정과 UI 조합을 통해 다양한 프로젝트에 적용 가능합니다
- DesignShowcase는 디자인 예시이자 실사용 가능한 UI 구성 요소입니다
- 내부 공유 및 용역 프로젝트 모두를 고려한 구조입니다
