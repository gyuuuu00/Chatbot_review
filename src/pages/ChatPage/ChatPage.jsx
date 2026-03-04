import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import ChatMessageList from "../../components/ChatMessageList/ChatMessageList";
import ChatInput from "../../components/ChatInput/ChatInput";
import { useChatMessages } from "../../hooks/useChatMessages";
import { useAuth } from "../../hooks/useAuth";
import {
  handleTextInput,
  handleQuickMenuClick,
  handleFAQResponse,
} from "../../services/messageHandlers";
import styles from "./ChatPage.module.css";

export default function ChatPage({ config }) {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "새 대화" },
  ]);
  const [activeChatId, setActiveChatId] = useState(1);

  // [TODO: 백엔드 연동 시 수정 필요]
  // 현재: 시나리오 페이지를 거쳐왔는지 location.state로 임시 체크 (새로고침 시 풀림)
  // 변경 후: location.state 체크 대신 아래 방식으로 교체
  //
  //   import { checkSession } from '../../api/authApi'
  //   const res = await checkSession()   // GET /api/session
  //   if (!res.success) { navigate('/', { replace: true }); return null }
  //
  // 백엔드에서 GET /api/session 구현 필요 → 로그인된 유저면 { success: true }, 아니면 { success: false }

  if (!config) {
    return <div>설정 오류: 챗봇 설정이 필요합니다.</div>;
  }

  const messageActions = useChatMessages(config);
  const { username, handleLogin, handleLogout } = useAuth(config);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userInput = input.trim();
    messageActions.addUserMessage(userInput);
    setInput("");
    await handleTextInput(userInput, config, messageActions);
  };

  const handleSubButton = async (label) => {
    messageActions.addUserMessage(label);
    if (label === "처음으로") {
      messageActions.resetToInitial();
      return;
    }
    const menuButton = config.quickMenuButtons?.find((btn) => btn.label === label);
    if (menuButton) {
      handleQuickMenuClick(menuButton.type, config, messageActions);
      return;
    }
    await handleFAQResponse(label, config, messageActions);
  };

  const handleNewChat = () => {
    if (chatHistory.length >= 10) return;
    const newId = Date.now();
    setChatHistory((prev) => [{ id: newId, title: `대화 ${prev.length + 1}` }, ...prev]);
    setActiveChatId(newId);
    messageActions.resetToInitial();
  };

  return (
    <div className={styles.layout}>
      <Sidebar
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={handleNewChat}
        username={username}
        onLogout={handleLogout}
      />
      <div className={styles.chatArea}>
        <ChatHeader username={username} onLoginClick={handleLogin} />
        <ChatMessageList
          messages={messageActions.messages}
          onSubButtonClick={handleSubButton}
        />
        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
