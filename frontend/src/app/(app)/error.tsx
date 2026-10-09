"use client";

import { StatePanel } from "@/components/ui/StatePanel";
import styles from "@/components/ui/state-panel.module.css";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ApplicationError({ reset }: ErrorBoundaryProps) {
  return (
    <div className={styles.skeletonPage} role="alert">
      <StatePanel
        title="Не удалось загрузить страницу"
        description="Проверь соединение с backend или повтори запрос."
        action={
          <button type="button" className={styles.retryButton} onClick={reset}>
            Повторить
          </button>
        }
      />
    </div>
  );
}
