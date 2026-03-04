import { useState } from "react";

// 현재 시간 포맷 헬퍼
const getCurrentTime = () => {
  return new Date().toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

/**
 * 채팅 메시지 상태 관리 Custom Hook
 */
export function useChatMessages(config) {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: config.initialMessage,
      timestamp: new Date(),
    },
    {
      from: "bot",
      subButtons: config.quickMenuButtons?.map((btn) => btn.label) || [],
      isQuickMenu: true,
      time: getCurrentTime(),
      timestamp: new Date(),
    },
  ]);

  // 사용자 메시지 추가
  const addUserMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        from: "user",
        text,
        time: getCurrentTime(),
      },
    ]);
  };

  // 봇 메시지 추가 (텍스트)
  const addBotMessage = (text, subButtons = null, showTime = true) => {
    const message = {
      from: "bot",
      text,
      subButtons,
    };

    if (showTime) {
      message.time = getCurrentTime();
    }

    setMessages((prev) => [...prev, message]);
  };

  // 봇 컴포넌트 메시지 추가
  const addBotComponent = (component, includeRestartButton = true) => {
    const newMessages = [
      {
        from: "bot",
        component,
      },
    ];

    if (includeRestartButton) {
      newMessages.push({
        from: "bot",
        subButtons: ["처음으로"],
        time: getCurrentTime(),
      });
    }

    setMessages((prev) => [...prev, ...newMessages]);
  };

  // 초기 상태로 리셋 (처음으로)
  const resetToInitial = () => {
    setMessages((prev) => [
      ...prev,
      {
        from: "bot",
        text: config.initialMessage,
      },
      {
        from: "bot",
        subButtons: config.quickMenuButtons?.map((btn) => btn.label) || [],
        isQuickMenu: true,
        time: getCurrentTime(),
      },
    ]);
  };

  return {
    messages,
    addUserMessage,
    addBotMessage,
    addBotComponent,
    resetToInitial,
    getCurrentTime,
  };
}
