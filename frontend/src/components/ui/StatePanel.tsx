import type { ReactNode } from "react";
import styles from "./state-panel.module.css";

type StatePanelProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function StatePanel({
  title,
  description,
  action,
}: StatePanelProps) {
  return (
    <section className={styles.panel}>
      <h2>{title}</h2>
      <p>{description}</p>
      {action && <div className={styles.action}>{action}</div>}
    </section>
  );
}

export function PageSkeleton() {
  return (
    <div className={styles.skeletonPage} role="status" aria-live="polite" aria-label="Загрузка страницы">
      <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
      <div className={`${styles.skeleton} ${styles.skeletonSubtitle}`} />

      <div className={styles.skeletonGrid}>
        {Array.from({ length: 3 }, (_, index) => (
          <div className={styles.skeletonCard} key={index}>
            <div className={`${styles.skeleton} ${styles.skeletonChip}`} />
            <div className={`${styles.skeleton} ${styles.skeletonLine}`} />
            <div className={`${styles.skeleton} ${styles.skeletonLineShort}`} />
          </div>
        ))}
      </div>
      <span className={styles.visuallyHidden}>Загружаем данные…</span>
    </div>
  );
}
