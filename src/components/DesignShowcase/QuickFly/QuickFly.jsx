import messageStyles from "../../Message/Message.module.css";
import styles from "./QuickFly.module.css";

/**
 * Quick Fly 디자인 시안
 * 챗봇 메시지 아래에 퀵 버튼 표시
 */
export default function QuickFlyDesign() {
  const quickButtons = [
    { label: "예시 1" },
    { label: "예시 2" },
    { label: "예시 3" },
  ];

  return (
    <div className={messageStyles.componentContainer}>
      <h3 className={messageStyles.componentTitle}>Quick Fly 디자인</h3>
    

      <div className={messageStyles.demoArea}>
        <div className={messageStyles.demoLabel}>시안 미리보기:</div>
        <div className={styles.chatContainer}>

          <div className={styles.messageBox}>
            <p>안녕하세요 고객님.</p>
            <p>지아이랩 법용 챗봇입니다.</p>
            <p>궁금한 내용을 직접 입력하시거나 아래 버튼에서 선택해 주세요.</p>
          </div>


          <div className={styles.quickButtonsContainer}>
            {quickButtons.map((btn, idx) => (
              <button
                key={idx}
                className={styles.quickButton}
                onClick={() => alert(`"${btn.label}" `)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
