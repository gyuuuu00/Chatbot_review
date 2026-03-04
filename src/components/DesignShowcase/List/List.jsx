import messageStyles from "../../Message/Message.module.css";
import styles from "./List.module.css";

/**
 * 리스트 버전 디자인 시안
 * FAQ나 검색 결과를 리스트 형식으로 표시
 */
export default function ListDesign() {
  const listItems = [
    { id: 1, text: "지원사업 추천" },
    { id: 2, text: "복지형 지원사업" },
    { id: 3, text: "광주광역시 지원사업" },
    { id: 4, text: "일반 지원사업" },
  ];

  return (
    <div className={messageStyles.componentContainer}>
      <h3 className={messageStyles.componentTitle}>리스트형 디자인</h3>
      <p className={messageStyles.componentDescription}>
        지원사업 종류를 선택하는 첫 번째 선택지를 제공하는 UI
      </p>

      <div className={styles.listContainer}>
        <div className={messageStyles.demoLabel}>예시:</div>
        <div className={styles.listment}>지원사업 중 원하시는 것을 선택해주세요:</div>
        {listItems.map((item) => (
          <button key={item.id} className={styles.listItem}>
            <span className={styles.listText}>{item.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
