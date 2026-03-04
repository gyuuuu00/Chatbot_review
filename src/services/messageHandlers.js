import React from "react";
import axios from "axios";

/**
 * 메시지 처리 관련 서비스
 */

/**
 * 텍스트 입력(CUI) 처리
 * 현재는 버튼 기반(GUI)으로만 사용하므로 텍스트 입력 비활성화 안내
 */
export async function handleTextInput(userInput, config, messageActions) {
  // 텍스트 입력 기능 비활성화 안내
  messageActions.addBotMessage(
    "텍스트 입력 기능은 준비 중입니다.\n아래 버튼을 이용해 주세요.",
    config.quickMenuButtons?.map((btn) => btn.label) || []
  );

  // TODO: AI 기반 텍스트 입력 이해 기능 활성화 시 아래 코드 사용
  // const CHATBOT_URL = config.api.chatbotUrl;
  // const res = await axios.post(`${CHATBOT_URL}/api/chatbot/intent-classification`, { text: userInput });
  // ... Intent 분류 로직
}

/**
 * 퀵메뉴 버튼 클릭 처리
 */
export function handleQuickMenuClick(menuType, config, messageActions) {
  // config에서 해당 메뉴 타입의 서브버튼 찾기
  const subButtonsKey = `${menuType}SubButtons`;
  const subButtons = config[subButtonsKey];

  if (!subButtons || subButtons.length === 0) {
    messageActions.addBotMessage("이 메뉴는 준비 중입니다.");
    return;
  }

  // config에서 메뉴 레이블을 가져와서 사용
  const menuButton = config.quickMenuButtons?.find(btn => btn.type === menuType);
  const menuLabel = menuButton?.label || "메뉴";

  const message = `${menuLabel} 중 원하시는 것을 선택해주세요:`;
  messageActions.addBotMessage(message, subButtons);
}

/**
 * 서브버튼 응답 처리 (설정 기반)
 * 첫 멘트 후 나오는 버튼 3단계 처리
 */
export async function handleFAQResponse(label, config, messageActions) {
  // 첫 번째 메뉴 (챗봇 디자인) - 디자인 쇼케이스
  if (config.MENU1SubButtons?.includes(label)) {
    return await handleDesignShowcase(label, messageActions);
  }

  // 두 번째 메뉴 (예시 1)
  if (config.MENU2SubButtons?.includes(label)) {
    messageActions.addBotMessage(
      `${label}에 대한 응답입니다. (필요시 추가 로직 구현 예정)`
    );
    messageActions.addBotMessage("", ["처음으로"]); // 두 번째 메시지도 시간 표시
    return;
  }

  // 세 번째 메뉴 (예시 2)
  if (config.MENU3SubButtons?.includes(label)) {
    messageActions.addBotMessage(
      `${label}에 대한 응답입니다. (필요시 추가 로직 구현 예정)`
    );
    messageActions.addBotMessage("", ["처음으로"]); // 두 번째 메시지도 시간 표시
    return;
  }
}

/**
 * 디자인 쇼케이스 컴포넌트 로드 및 표시
 */
async function handleDesignShowcase(label, messageActions) {
  let DesignComponent = null;

  try {
    // Vite의 동적 import 제약으로 인해 switch문 사용
    switch (label) {
      case "자연어 버전": {
        const { default: NaturalLanguageDesign } = await import("../components/DesignShowcase/NaturalLanguage/NaturalLanguage.jsx");
        DesignComponent = <NaturalLanguageDesign />;
        break;
      }
      case "Quick Menu": {
        const { default: QuickMenuDesign } = await import("../components/DesignShowcase/QuickMenu/QuickMenu.jsx");
        DesignComponent = <QuickMenuDesign />;
        break;
      }
      case "Quick Fly": {
        const { default: QuickFlyDesign } = await import("../components/DesignShowcase/QuickFly/QuickFly.jsx");
        DesignComponent = <QuickFlyDesign />;
        break;
      }
      case "리스트 버전": {
        const { default: ListDesign } = await import("../components/DesignShowcase/List/List.jsx");
        DesignComponent = <ListDesign />;
        break;
      }
      case "일반 카드버전": {
        const { default: CardDesign } = await import("../components/DesignShowcase/Card/Card.jsx");
        DesignComponent = <CardDesign />;
        break;
      }
      case "이미지 카드버전": {
        const { default: ImageCardDesign } = await import("../components/DesignShowcase/ImageCard/ImageCard.jsx");
        DesignComponent = <ImageCardDesign />;
        break;
      }
      default:
        messageActions.addBotMessage("해당 디자인을 찾을 수 없습니다.");
        return;
    }

    if (DesignComponent) {
      // JSX로 이미 생성된 컴포넌트를 그대로 전달
      messageActions.addBotComponent(DesignComponent, true);
    }
  } catch (error) {
    console.error("컴포넌트 로드 실패:", error);
    messageActions.addBotMessage("디자인 로드 중 오류가 발생했습니다.");
  }
}
