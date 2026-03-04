import React from "react";
import messageStyles from "../../Message/Message.module.css";
import styles from "./NaturalLanguage.module.css";

/**
 * 자연어 버전 디자인 시안
 * API 응답을 일반 텍스트 형식으로 표시
 */
export default function NaturalLanguageDesign() {
  return (
    <div className={messageStyles.componentContainer}>
      <h3 className={messageStyles.componentTitle}>자연어 버전 디자인</h3>
      <p className={messageStyles.componentDescription}>
        버튼을 쓰지 않고,사람이 말하듯이 자연어로 안내하는 입력형(텍스트/음성) UI
      </p>

      <div className={messageStyles.demoArea}>
        <div className={messageStyles.demoLabel}>예시:</div>
        <div className={styles.exampleContent}>
          <p>
            사업 검색 및 신청 방법 :<br /><br />
            1. 메인화면에서 "사업찾기" 클릭<br />
            2. 업종/지역/지원형태로 필터링 <br />
            3. 관심 사업 상세보기<br />
            4. "신청하기" 버튼 클릭<br />
            5. 필요 서류 업로드 <br />
            6. 신청 완료
          </p>
        </div>
      </div>
    </div>
  );
}
