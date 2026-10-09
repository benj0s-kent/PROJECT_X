"use client";

import { StatePanel } from "@/components/ui/StatePanel";
import styles from "@/components/ui/state-panel.module.css";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RootError({ reset }: ErrorBoundaryProps) {
  return (
    <main className={styles.skeletonPage} role="alert">
      <StatePanel
        title="Что-то пошло не так"
        description="Не удалось загрузить данные. Повтори запрос через пару секунд."
        action={
          <button type="button" className={styles.retryButton} onClick={reset}>
            Повторить
          </button>
        }
      />
    </main>
  );
}
