import styles from "./Sidebar.module.css";

export default function Sidebar({
  chatHistory,
  activeChatId,
  onSelectChat,
  onNewChat,
  username,
  onLogout,
}) {
  const isMaxReached = chatHistory.length >= 10;

  return (
    <div className={styles.sidebar}>
      {/* 새 대화 버튼 */}
      <button
        className={styles.newChatButton}
        onClick={onNewChat}
        disabled={isMaxReached}
        title={isMaxReached ? "대화는 최대 10개까지 가능합니다" : ""}
      >
        + 새 대화
      </button>

      {/* 대화 히스토리 목록 */}
      <ul className={styles.historyList}>
        {chatHistory.map((chat) => (
          <li
            key={chat.id}
            className={`${styles.historyItem} ${chat.id === activeChatId ? styles.active : ""}`}
            onClick={() => onSelectChat(chat.id)}
          >
            {chat.title}
          </li>
        ))}
      </ul>

      {/* 하단 유저 영역 */}
      <div className={styles.userArea}>
        <span className={styles.username}>{username || "로그인 필요"}</span>
        <button className={styles.logoutButton} onClick={onLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
