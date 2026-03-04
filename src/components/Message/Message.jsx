import botIcon from "../../assets/bot.svg";
import TypingIndicator from "../TypingIndicator/TypingIndicator";
import styles from './Message.module.css';
import quickFlyStyles from '../DesignShowcase/QuickFly/QuickFly.module.css';
import { getCurrentConfig } from '../../config/chatbotConfig';

const config = getCurrentConfig();

export default function Message({
  message,
  showAvatar = true,
  onSubButtonClick,
}) {
  const { from, text, time, subButtons, isTyping, component, isQuickMenu } = message;
  const isUser = from === "user";

  // 타이핑 애니메이션을 표시하는 경우
  if (isTyping) {
    return <TypingIndicator />;
  }

  // "처음으로", "더보기" 버튼과 일반 버튼 분리
  const specialButtons = ["처음으로", "더보기"];
  const normalButtons = subButtons?.filter(btn => {
    const btnText = typeof btn === "string" ? btn : btn.title;
    return !specialButtons.includes(btnText);
  });
  const actionButtons = subButtons?.filter(btn => {
    const btnText = typeof btn === "string" ? btn : btn.title;
    return specialButtons.includes(btnText);
  });

  // 사용자 메시지 렌더링
  if (isUser) {
    return (
      <div className={`${styles.msg} ${styles.user}`}>
        <div className="content">
          <div className={styles.bubble}>
            {text && <div className={styles.text}>{text}</div>}
          </div>
          {time && <div className={styles.time}>{time}</div>}
        </div>
      </div>
    );
  }

  // 봇 메시지 렌더링
  return (
    <div className={`${styles.msg} ${styles.bot}`}>
      <div className={styles.botSection}>
        {/* 아이콘과 이름을 가로로 배치 (첫 메시지일 때만) */}
        {showAvatar && (
          <div className={styles.botHeader}>
            <img className={styles.avatar} src={botIcon} alt={config.name} />
            <span className={styles.botName}>{config.name}</span>
          </div>
        )}

        {/* bubble들은 아이콘 아래에 배치 */}
        <div className={styles.botContent}>
          {/* 커스텀 컴포넌트 렌더링 (디자인 시안 등) */}
          {component && <div className={styles.componentWrapper}>{component}</div>}

          {/* text가 있거나, normalButtons가 있을 때만 bubble 렌더링 */}
          {(text || (normalButtons && normalButtons.length > 0)) && (
            <div className={`${styles.bubble} ${isQuickMenu ? styles.buttonOnlyBubble : ''}`}>
              {text && <div className={styles.text}>{text}</div>}

              {/* 일반 하위 버튼 (지원사업 추천 등) */}
              {normalButtons && normalButtons.length > 0 && (
                <div className={isQuickMenu ? quickFlyStyles.quickButtonsContainer : styles.subButtonBox}>
                  {normalButtons.map((btn, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (btn.onClick) { 
                          btn.onClick();
                        } else if (typeof btn === "string") {
                          onSubButtonClick(btn);
                        } else if (btn.link) {
                          window.open(btn.link, "_blank");
                        }
                      }}
                      className={isQuickMenu ? quickFlyStyles.quickButton : styles.subButton}
                    >
                      {typeof btn === "string" ? btn : btn.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 처음으로, 더보기 버튼 (bubble 밖에서 독립적으로 렌더링) */}
          {actionButtons && actionButtons.length > 0 && (
            <div className={styles.actionButtonBox}>
              {actionButtons.map((btn, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (btn.onClick) {
                      btn.onClick();
                    } else if (typeof btn === "string") {
                      onSubButtonClick(btn);
                    } else if (btn.link) {
                      window.open(btn.link, "_blank");
                    }
                  }}
                  className={styles.actionButton}
                >
                  {typeof btn === "string" ? btn : btn.title}
                </button>
              ))}
            </div>
          )}

          {time && <div className={styles.time}>{time}</div>}
        </div>
      </div>
    </div>
  );
}
