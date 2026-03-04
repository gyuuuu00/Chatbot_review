import messageStyles from "../../Message/Message.module.css";
import styles from "./Card.module.css";

/**
 * 일반 카드 버전 디자인 시안
 * 그리드 형식의 카드 레이아웃
 */
export default function CardDesign() {
  const listItems = [
    {
      id: 1,
      title: "일반카드1\n링크",
      // url: "https://example.com/1",
    },
    {
      id: 2,
      title: "일반카드2\n링크",
      // url: "https://example.com/2",
    },
    {
      id: 3,
      title: "일반카드3\n링크",
      // url: "https://example.com/3",
    },
  ];

  // const handleCardClick = (url) => {
  //   window.open(url, '_blank');
  // };


  return (
    <div className={messageStyles.componentContainer}>
      <h3 className={messageStyles.componentTitle}>카드 버전 디자인</h3>
      <p className={messageStyles.componentDescription}>
        카드 형태의 정보 블록을 챗봇 대화창에 보여주는 UI
      </p>

{/* 카드 눌렀을때 링크로 타고 넘어가야함 */}
      <div className={styles.cardContainer}>
        {listItems.map((item) => (
          <div
            key={item.id}
            className={styles.cardItem}
            // onClick={() => handleCardClick(item.url)}
          >
            <h4 className={styles.cardTitle}>{item.title}</h4>
            <button className={styles.cardDetailButton}>바로가기</button>
          </div>
        ))}
      </div>
    </div>
  );
}
