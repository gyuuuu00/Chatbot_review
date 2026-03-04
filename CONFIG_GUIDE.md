# 챗봇 설정 가이드

`src/config/chatbotConfig.js` 하나에서 챗봇의 이름, 기능, 메뉴 구성을 모두 관리합니다.

---

## 📁 관련 파일 구조

```
src/
├── config/
│   └── chatbotConfig.js     # 챗봇 설정 파일 (여기서 모든 설정 관리)
├── pages/
│   ├── LoginPage/           # 로그인
│   ├── Register/            # 회원가입
│   ├── ScenarioAPage/       # 업무 종류 선택
│   └── ChatPage/            # 메인 챗봇 (사이드바 포함)
└── App.jsx                  # 라우팅
.env.development             # 챗봇 타입 환경변수 설정
```

---

## 🚀 챗봇 타입 변경하기

`.env.development` 에서 원하는 챗봇 타입을 선택합니다.

```env
# 기본 샘플 챗봇
VITE_CHATBOT_TYPE=sample

# 범용 챗봇
VITE_CHATBOT_TYPE=general
```

---

## ➕ 새로운 챗봇 추가하기

`src/config/chatbotConfig.js`에 새 설정을 추가하고, `.env.development`에서 타입을 지정합니다.

```javascript
export const chatbotConfigs = {

  myCustomBot: {
    name: "나만의 챗봇",
    initialMessage: "안녕하세요! 어떻게 도와드릴까요?",

    features: {
      login: false,
      textInputWithAI: false,
      programRecommendation: false,
      programInfo: false,
      platformGuide: false,
      faqSearch: true,
      quickMenu: true,
      designShowcase: false,
    },

    categories: [],
    regions: [],
    defaultRegion: null,

    api: {
      sbizUrl: "",
      chatbotUrl: import.meta.env.VITE_CHATBOT_URL,
    },

    quickMenuButtons: [
      { type: "MENU1", label: "메뉴1 이름" },
      { type: "MENU2", label: "메뉴2 이름" },
    ],

    MENU1SubButtons: ["항목1", "항목2", "항목3"],
    MENU2SubButtons: ["항목1", "항목2"],
  },

};
```

```env
# .env.development
VITE_CHATBOT_TYPE=myCustomBot
```

---

## ⚙️ 설정 옵션 설명

### `features` (기능 활성화/비활성화)

| 옵션 | 설명 |
|---|---|
| `login` | 로그인 기능 |
| `textInputWithAI` | AI 기반 텍스트 입력 이해 |
| `programRecommendation` | 지원사업 추천 |
| `programInfo` | 지원사업 정보 |
| `platformGuide` | 플랫폼 기능 안내 |
| `faqSearch` | 자주 묻는 질문 |
| `quickMenu` | 하단 퀵 메뉴 표시 |
| `designShowcase` | 디자인 쇼케이스 (개발/샘플용) |

---

### `quickMenuButtons` (퀵 메뉴 버튼)

챗봇 하단에 표시되는 버튼 목록입니다. `type`은 하위 버튼 키와 연결됩니다.

```javascript
quickMenuButtons: [
  { type: "MENU1", label: "화면에 표시될 이름" },
  { type: "MENU2", label: "화면에 표시될 이름" },
  { type: "MENU3", label: "화면에 표시될 이름" },
]
```

---

### `MENU1SubButtons` / `MENU2SubButtons` / `MENU3SubButtons`

각 퀵 메뉴 버튼을 클릭했을 때 나타나는 하위 버튼 목록입니다.
`quickMenuButtons`의 `type`과 이름이 매칭되어야 합니다.

```javascript
MENU1SubButtons: ["하위항목1", "하위항목2", "하위항목3"],
MENU2SubButtons: ["하위항목1", "하위항목2"],
MENU3SubButtons: ["하위항목1"],
```
