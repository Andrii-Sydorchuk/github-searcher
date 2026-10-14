import styles from "./SkeletonCard.module.css";

export default function SkeletonCard() {
  return (
    <div
      className={styles.skeletonCard}
      aria-busy="true"
      aria-label="Loading content"
    >
      <div className={styles.topSection}>
        <div className={styles.headerRow}>
          <div className={`${styles.avatar} ${styles.shimmer}`} />
          <div className={`${styles.headerText} ${styles.shimmer}`} />
        </div>

        <div className={`${styles.title} ${styles.shimmer}`} />
        <div className={`${styles.line1} ${styles.shimmer}`} />
        <div className={`${styles.line2} ${styles.shimmer}`} />
      </div>

      <div className={styles.footerRow}>
        <div className={`${styles.footerStat} ${styles.shimmer}`} />
        <div className={`${styles.footerStat} ${styles.shimmer}`} />
      </div>
    </div>
  );
}
