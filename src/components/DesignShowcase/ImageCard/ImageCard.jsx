import messageStyles from "../../Message/Message.module.css";
import styles from "./ImageCard.module.css";
import imgcard from "../../../assets/ex_imgcard.svg";

/**
 * 이미지 카드 버전 디자인 시안
 * 이미지가 포함된 비주얼 카드 레이아웃
 */
export default function ImageCardDesign() {
  const imageCards = [
    {
      id: 1,
      title: "지아이랩",
      image: imgcard,
    },
  ];

  return (
    <div className={messageStyles.componentContainer}>
      <h3 className={messageStyles.componentTitle}>이미지 카드 버전 디자인</h3>
      <p className={messageStyles.componentDescription}>
        제품, 서비스, 장소 등 시각적 요소를 카드 형태의 UI로 보여주는 디자인
      </p>

      <div className={styles.imageCardGrid}>
        {imageCards.map((card) => (
          <div key={card.id} className={styles.imageCard}>
            <div className={styles.imageWrapper}> 
              <img
                src={card.image}
                alt={card.title}
                className={styles.cardImage}
              />
              {card.badge && (
                <span className={styles.badge}>{card.badge}</span>
              )}
            </div>
            <div className={styles.cardContent}>
              <h4 className={styles.imageCardTitle}>{card.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
