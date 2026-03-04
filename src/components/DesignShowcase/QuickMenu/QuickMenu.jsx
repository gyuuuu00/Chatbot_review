import { useState } from "react";
import FAQ1 from "../../../assets/FAQ1.svg";
import FAQ2 from "../../../assets/FAQ2.svg";
import FAQ3 from "../../../assets/FAQ3.svg";
import messageStyles from "../../Message/Message.module.css";
import styles from "./QuickMenu.module.css";

// 아이콘 매핑 (type에 따라 다른 아이콘 사용)
const iconMap = {
  FAQ1: FAQ1,
  FAQ2: FAQ2,
  FAQ3: FAQ3,
};

/**
 * Quick Menu 디자인 시안
 * 하단 고정 퀵메뉴 버튼을 시연
 */
export default function QuickMenuDesign() {
  const [isOpen, setIsOpen] = useState(true);

  const demoButtons = [
    { type: "FAQ1", label: "자주하는\n질문(FAQ)1" },
    { type: "FAQ2", label: "자주하는\n질문(FAQ)2" },
    { type: "FAQ3", label: "자주하는\n질문(FAQ)3" },
  ];

  const handleMenuClick = (type) => {
    alert(`${type} 버튼이 클릭되었습니다.`);
  };

  return (
    <div className={messageStyles.componentContainer}>
      <h3 className={messageStyles.componentTitle}>Quick Menu 디자인</h3>
      <p className={messageStyles.componentDescription}>
        하단에 고정된 퀵메뉴 버튼을 통해 사용자가 자주 찾는 기능이나 정보를 빠르게 접근할 수 있는 UI
      </p>

      <div className={messageStyles.demoArea}>
        <div className={messageStyles.demoLabel}>시안 미리보기:</div>
        <div className={styles.quickMenuWrapper}>
          <div className={`${styles.buttonBox} ${isOpen ? styles.open : styles.closed}`}>
            {/* 상단 토글 핸들 */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={styles.toggleHandle}
            ></div>

            {/* 버튼 리스트 - 설정 기반으로 동적 생성 */}
            <div className={`${styles.buttonList} ${isOpen ? styles.open : styles.closed}`}>
              {demoButtons.map((button, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => handleMenuClick(button.type, e)}
                  className={styles.menuBtn}
                >
                  <img
                    src={iconMap[button.type] || FAQ1}
                    alt={button.label}
                    className={styles.menuIcon}
                  />
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
