// 챗봇 설정 파일

const SBIZ_URL = import.meta.env.VITE_SBIZ_URL || "";
const CHATBOT_URL = import.meta.env.VITE_CHATBOT_URL || "";

export const chatbotConfigs = {
  // 지아이랩 범용 챗봇 설정
  sample: {
    name: "지아이랩 범용 챗봇",
    initialMessage: "안녕하세요 고객님.\n지아이랩 범용 챗봇입니다.\n궁금한 내용을 직접 입력하시거나 아래 버튼에서 선택해 주세요.",

    // 활성화된 기능 목록
    features: {
      login: false,                   // 로그인 기능 (사용 안 함)
      textInputWithAI: false,         // AI 기반 텍스트 입력 이해 (사용 안 함)
      programRecommendation: false,   // 지원사업 추천 (사용 안 함)
      programInfo: false,             // 지원사업 정보 (사용 안 함)
      platformGuide: false,           // 플랫폼 기능 안내 (사용 안 함)
      faqSearch: true,                // 자주 묻는 질문
      quickMenu: true,                // 하단 퀵 메뉴
      designShowcase: true,           // 디자인 시안 보기 (FAQ1로 구현)
    },

    // 카테고리 (아직 미정)
    categories: [],

    // 지역 선택 옵션 (사용 안 함)
    regions: [],
    defaultRegion: null,

    // API 엔드포인트
    api: {
      sbizUrl: SBIZ_URL,
      chatbotUrl: CHATBOT_URL,
    },

    // 퀵 메뉴 버튼 설정
    quickMenuButtons: [
      { type: "MENU1", label: "챗봇 디자인" },
      { type: "MENU2", label: "예시 1" },
      { type: "MENU3", label: "예시 2" },
    ],

    // MENU1 (챗봇 디자인) -> 가지고 있는 디자인 샘플 하위 메뉴
    MENU1SubButtons: [
      "자연어 버전",
      "Quick Menu",
      "Quick Fly",
      "리스트 버전",
      "일반 카드버전",
      "이미지 카드버전"
    ],

    // MENU2 (예시 1) -> 추후 내용 추가 예정
    MENU2SubButtons: [
      "내용추가예정",
      "내용추가예정",
      "내용추가예정",
    ],

    // MENU3 (예시 2) -> 추후 내용 추가 예정
    MENU3SubButtons: [
      "내용추가예정",
      "내용추가예정",
      "내용추가예정",
    ],
  },

  // 다른 내용의 챗봇 설정 예시
  general: {
    name: "범용 챗봇",
    initialMessage: "안녕하세요! 무엇을 도와드릴까요?",

    features: {
      login: false,
      programRecommendation: false,
      programInfo: false,
      platformGuide: false,
      faqSearch: true,
      quickMenu: false,
    },

    categories: [],
    regions: [],
    defaultRegion: null,

    api: {
      sbizUrl: "",
      chatbotUrl: CHATBOT_URL,
    },

    quickMenuButtons: [],
    programSubButtons: [],
    guideSubButtons: [],
    faqSubButtons: [],
  },
};

// 현재 사용할 챗봇 타입을 환경변수에서 가져오거나 기본값 사용
export const getCurrentChatbotType = () => {
  return import.meta.env.VITE_CHATBOT_TYPE || "sample";
};

// 현재 챗봇 설정 가져오기
export const getCurrentConfig = () => {
  const type = getCurrentChatbotType();
  return chatbotConfigs[type] || chatbotConfigs.sample;
};
